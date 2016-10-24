#!/bin/bash

DOCKERDIR=$(dirname $0)/docker
DISTDIR=${DOCKERDIR}/dist

# prepares a docker directory for build
rm -rf ${DOCKERDIR}
mkdir -p ${DISTDIR}

# init build-tool and build the frontend
npm install && npm run build || exit 1

# include frontend in dist
cp -r dist ${DOCKERDIR}

cp Dockerfile server.js ${DOCKERDIR}