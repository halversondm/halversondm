# syntax=docker/dockerfile:1

FROM node:24-alpine AS web-build
WORKDIR /repo
COPY package.json package-lock.json ./
COPY apps/web/package.json apps/web/package.json
COPY apps/server/package.json apps/server/package.json
RUN npm ci --ignore-scripts
COPY apps/web apps/web
RUN npm run build --workspace=apps/web

FROM node:24-alpine AS server-deps
WORKDIR /repo
COPY package.json package-lock.json ./
COPY apps/web/package.json apps/web/package.json
COPY apps/server/package.json apps/server/package.json
RUN npm ci --workspace=apps/server --omit=dev --ignore-scripts

FROM node:24-alpine
LABEL maintainer="Dan Halverson"
ENV TABLE_NAME=ABC
ENV AWS_REGION=us-east-1
WORKDIR /app
COPY --from=server-deps /repo/node_modules ./node_modules
COPY apps/server ./
COPY --from=web-build /repo/apps/web/dist ./public
EXPOSE 3000
CMD ["node", "server.js"]
