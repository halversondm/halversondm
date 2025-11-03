FROM node:22-alpine
LABEL maintainer="Dan Halverson"
RUN apk update && apk add curl
ENV TABLE_NAME=ABC
WORKDIR /app
ADD . /app
EXPOSE 3000
RUN npm install
CMD ["node", "server.js"]
