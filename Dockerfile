FROM docker.adeo.no:5000/alpine-node:base-6.9
MAINTAINER Frode Sundby <frode.sundby@nav.no>

WORKDIR /src
ADD ./dist .

EXPOSE 8443

CMD ["node", "server.js"]