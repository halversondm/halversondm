FROM node:18-alpine
MAINTAINER Dan Halverson
RUN npm install -g nodemon
WORKDIR /src
ADD . /src
EXPOSE 3000
RUN cd /src && npm install
CMD ["nodemon", "/src/server.js"]
