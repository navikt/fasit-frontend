#!/bin/bash

DOCKERDIR=$(dirname $0)/docker
DISTDIR=${DOCKERDIR}/dist

# prepares a docker directory for build
rm -rf ${DOCKERDIR}
mkdir -p ${DISTDIR}

# Copy required files to the dist directory
cp server.js config.js ${DISTDIR}

# install the application dependencies
cd ${DISTDIR} && cp ../../package.json . && npm install --production && cd -

# init build-tool and build the frontend
npm install && npm run build || exit 1

# Copy finished build to dist directory
cp -r dist ${DISTDIR}

# Copy Dockerfile in order to build from docker dir
cp Dockerfile ${DOCKERDIR}