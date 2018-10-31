fasit frontend
=====

[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE)
[![Known Vulnerabilities](https://snyk.io/test/github/navikt/fasit-frontend/badge.svg?targetFile=package.json)](https://snyk.io/test/github/navikt/fasit-frontend?targetFile=package.json)


## Basic Usage
### Testing

```sh
npm install 
npm test 
```



### Running in standalone mode with mocked backend

```sh
npm install
npm run mocked
```

### Running with a real backend

First set the environment variables in config.js to a working backend.

```sh 
npm install
npm run dev
```

## CI

on push:

- run tests
- bump version
- produce docker image
- deploy to ci environment 
- run integration tests 
- deploy to production
