FROM node:9-alpine
MAINTAINER Mats Byfuglien <mats.byfuglien@nav.no>

WORKDIR /src
ADD ./dist .

EXPOSE 8080

CMD ["node", "production_server.js"]