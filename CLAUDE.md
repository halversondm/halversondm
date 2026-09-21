# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Dan Halverson's personal website (halversondm.com) — an npm workspaces monorepo with two packages: `apps/web` (React + TypeScript SPA built with Webpack) and `apps/server` (the Express server that serves it in production).

## Commands

Run from the repo root (all delegate to `apps/web` via npm workspaces):

```bash
npm start               # webpack-dev-server on port 4000 (apps/web/webpack.dev.js), opens browser, mocks /api/* proxy responses
npm run start:server    # runs apps/server with Node's --watch for local backend iteration
npm test                # vitest watch mode
npm run test:run        # vitest single run (also runs as part of apps/web's `prebuild` and the pre-commit hook)
npm run test:coverage   # vitest with coverage
npm run lint            # eslint . (repo-wide, TS/TSX only)
npm run prettier        # prettier . --write (repo-wide)
npm run prettier:check  # prettier . --check (run in CI)
npm run build           # apps/web prebuild (clean + test:run) then webpack --config webpack.prod.js
```

Run a single test file: `npx vitest run --config apps/web/vitest.config.js apps/web/tests/unit/Home.test.tsx` (or `cd apps/web && npx vitest run tests/unit/Home.test.tsx`). Run by name: add `-t "Home component"`.

Build and run the production Docker image from the repo root: `docker build -t halversondm .` then `docker run -p 3000:3000 halversondm`.

Run the full stack locally against emulated AWS services: `docker compose up --build`, then hit `http://localhost:3000`. See "Local AWS services" below.

## Architecture

- **`apps/web/`** is the frontend workspace. `apps/web/app/` is the TypeScript/React source root (`apps/web/tsconfig.json` `rootDir`); `apps/web/app/main.tsx` mounts `App` from `apps/web/app/components/App.tsx` into `#root`.
- **`apps/web/app/components/App.tsx`** is the single router: a `BrowserRouter` with one flat `<Routes>` list and a matching `Navbar` — every page is a top-level route/component pair here, there is no nested routing or layout composition. Adding a page means adding both a nav `LinkContainer` and a `Route` in this file.
- Each route generally maps 1:1 to a component in `apps/web/app/components/*.tsx`; components are largely self-contained demo/portfolio pages (calculators, games, car photo galleries, a blog reader, a resume, etc.) rather than a shared design system.
- Some components have a paired `*Service.tsx` (e.g. `DiscountCalculator` + `DiscountCalculatorService`, `Game` + `GameService`) that holds the non-UI logic separately from rendering.
- **`apps/server/`** is the backend workspace — a standalone Express app (`server.js`) with its own `package.json`. It:
  - Serves the built frontend from `./public` (populated in the Docker image from `apps/web`'s build output — see below) and falls back to `public/index.html` for client-side routes.
  - Proxies `/api/stock` (Polygon.io) and `/api/blog` (Blogger API) server-side so API keys aren't exposed to the client.
  - Exposes `/api/abc` and `/saveABC` backed by DynamoDB (`dyna.js`, using `@aws-sdk/client-dynamodb`) for the `ABC` component (behavior tracking form).
  - Pulls API keys from AWS Secrets Manager (`secretsManager.js`) at startup when `AWS_REGION` is set; otherwise `apiKeys` stays empty (local/dev).
- `apps/server/scripts/ABCCreateTable.js` is a one-off script (uses the old `aws-sdk` v2, not a declared dependency) for provisioning the local DynamoDB `ABC` table; it's not part of the app runtime.
- The root `Dockerfile` is a 3-stage build: `web-build` runs `npm run build --workspace=apps/web`, `server-deps` runs `npm ci --workspace=apps/server --omit=dev`, and the final stage copies the server's `node_modules` + source plus the web build's `dist` output (mounted as `./public`) into a single image whose `CMD` is `node server.js`. There is no local commit of a `dist/` deploy artifact — the image is built directly from source.
- In dev, `apps/web/webpack.dev.js` stubs the `/api/*` proxy responses directly (see the `bypass` function) instead of hitting the real Express server, so `stockSymbol` queries and blog responses are faked locally.

### Local AWS services

`apps/server` depends on two real AWS services: DynamoDB (`dyna.js`) and Secrets Manager (`secretsManager.js`), neither of which is mocked in code — both clients are constructed with no explicit endpoint and rely entirely on env vars (`AWS_REGION`, and the SDK's built-in `AWS_ENDPOINT_URL_<SERVICE>` override support) for where to connect. `docker-compose.yml` runs a single `localstack/localstack` container emulating both services, seeded on startup by `localstack/init/01-init.sh` (creates the `ABC` table and a `prod/halversondm` secret with dummy Polygon/Google API keys), and points the `web` service at it via `AWS_ENDPOINT_URL_DYNAMODB`/`AWS_ENDPOINT_URL_SECRETS_MANAGER`. The `web` service's `depends_on` health check polls LocalStack's `/_localstack/init/READY` endpoint (not `/_localstack/health`) specifically so it waits for the init script to finish seeding data, not just for the LocalStack process to be up.

## Testing

- Vitest + `happy-dom` + Testing Library (`apps/web/vitest.config.js`, `apps/web/setupTests.js`).
- Network calls are mocked globally via MSW (`setupTests.js` sets up handlers for `/saveABC`, `/api/stock*`, `/api/blog`, and the LinkedIn/Twitter widget scripts). Add new handlers there rather than mocking `fetch` per-test.
- Most component tests render the component and snapshot-match the container (`apps/web/tests/unit/__snapshots__/*.snap`); follow that pattern for new components — wrap in `BrowserRouter` if the component uses routing.
- `husky` pre-commit runs `npm run test:run` then `lint-staged` (`eslint --fix` on `.ts`/`.tsx`, `prettier --write` on `.js`/`.tsx`/`.css`/`.md`).

## Linting/formatting notes

- `eslint.config.mjs` (root) only lints `.ts`/`.tsx` files across the whole repo (`.js` files and any `tests/**` directory are ignored) and uses `typescript-eslint` recommended + `eslint-config-prettier`.
- `@typescript-eslint/no-unused-vars` allows `_`-prefixed args/vars.

## CI/CD

- `.github/workflows/main.yml` (push to `master`): `npm ci` at the repo root (installs both workspaces), `prettier:check`, `lint`, `build`, then `docker buildx build -f Dockerfile .` from the repo root and pushes the image to ECR, then forces an ECS service redeploy.
- `.github/workflows/not-main.yml` (any other branch): install, `prettier:check`, `lint`, `build` — no deploy.
- `apps/web/dist` and any root `node_modules` are build artifacts/installs, not hand-edited sources.
