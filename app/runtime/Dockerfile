FROM node:22-alpine
LABEL maintainer="Dan Halverson"
WORKDIR /app
ADD . /app
EXPOSE 3000
RUN npm install
CMD ["node", "server.js"]
