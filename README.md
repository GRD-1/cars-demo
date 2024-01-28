# cars-demo
This is an application for storing and managing a car database.
It consists of two parts:
* a server that implements the REST API
* a CLI client that allows you to make queries to this database
* 

<br>
<p style="display: block; width: 100%; text-align:left;">
  <a href="https://nodejs.org/en/about" target="_blank"><img src="https://img.shields.io/badge/Node.js-v18.16.0-blue?logo=nodedotjs" alt="Node.js Version" /></a>
  <a href="https://www.typescriptlang.org/" target="_blank"><img src="https://img.shields.io/badge/TypeScript-v4.7.4-blue?logo=typescript" alt="TypeScript Version" /></a>
  <a href="" target="_blank"><img src="https://img.shields.io/badge/covarage-91.92%20-%2300c642?style=flat" alt="Coverage" /></a>
  <a href="" rel="nofollow"><img src="https://img.shields.io/badge/istall_size-236%20KB-%23ebdb32?style=flat" alt="install size"></a>
</p>

## Contents

1. [Stack](#Stack)
2. [Launch](#launch)
3. [Usage](#usage)
4. [Environment](#environment)
5. [Settings](#settings)
6. [Tests](#tests)
7. [Database](#tests)
8. [Logs](#tests)
9. [CI/CD](#cicd)
10. [Documentation](#documentation)

## Stack

<div>
    <div>
      <div style="display: flex; flex-wrap: wrap; height: 200px;">
        <div style="width: 40%; height: fit-content;"><a href="https://ubuntu.com/" target="_blank"><img src="https://img.shields.io/badge/Linux_Ubuntu-v22.04-blue?style=for-the-badge&logo=ubuntu" alt="Linux Ubuntu Version" /></a></div>
        <div style="width: 40%; height: fit-content;"><a href="https://jestjs.io/" target="_blank"><img src="https://img.shields.io/badge/Jest-v29.0.5-blue?style=for-the-badge&logo=jest" alt="Jest Version" /></a></div>
        <div style="width: 40%; height: fit-content;"><a href="https://www.docker.com/products/docker-desktop/" target="_blank"><img src="https://img.shields.io/badge/docker-v24.0.2-blue?style=for-the-badge&logo=docker" alt="Docker Version" /></a></div>
        <div style="width: 40%; height: fit-content;"><a href="https://www.npmjs.com/package/supertest" target="_blank"><img src="https://img.shields.io/badge/supertest-v6.1.3-blue?style=for-the-badge" alt="Supertest Version" /></a></div>
        <div style="width: 40%; height: fit-content;"><a href="https://nodejs.org/en/about" target="_blank"><img src="https://img.shields.io/badge/Node.js-v18.16.0-blue?style=for-the-badge&logo=nodedotjs" alt="Node.js Version" /></a></div>
        <div style="width: 40%; height: fit-content;"><a href="https://eslint.org/" target="_blank"><img src="https://img.shields.io/badge/eslint-v8.51.0-blue?style=for-the-badge&logo=eslint" alt="Eslint Version" /></a></div>
        <div style="width: 40%; height: fit-content;"><a href="https://www.typescriptlang.org/" target="_blank"><img src="https://img.shields.io/badge/TypeScript-v4.7.4-blue?style=for-the-badge&logo=typescript" alt="TypeScript Version" /></a></div>
        <div style="width: 40%; height: fit-content;"><a href="https://prettier.io/" target="_blank"><img src="https://img.shields.io/badge/prettier-v2.3.2-blue?style=for-the-badge&logo=prettier" alt="Prettier Version" /></a></div>
        <div style="width: 40%; height: fit-content;"><a href="https://www.npmjs.com/" target="_blank"><img src="https://img.shields.io/badge/npm-v9.5.1-blue?style=for-the-badge&logo=npm" alt="npm Version" /></a></div>
        </div>
    </div>
</div>
<br>

## Launch

The project is prepared to launch via the docker.You need to install <a href="https://www.docker.com/products/docker-desktop/" target="_blank">Docker</a>

and then run the corresponding command in the terminal.

* for development mode use:

```bash
$ docker stop $(docker ps -aq)
$ docker-compose -f devops/docker-compose.yml --env-file env/dev.env up -d
$ docker logs cars-demo-node-dev -f --tail 30
```

* for debug mode use:

```bash
$ docker stop $(docker ps -aq)
$ docker-compose -f devops/docker-compose.yml --env-file env/debug.env up -d
$ docker logs cars-demo-node-debug -f --tail 30
```

* for product mode use:

```bash
$ docker stop $(docker ps -aq)
$ docker-compose -f devops/docker-compose.yml --env-file env/prod.env up -d
```

* for qa mode use:

```bash
$ docker stop $(docker ps -aq)
$ docker-compose -f devops/docker-compose.yml --env-file env/qa.env up -d
```

## Usage

* after starting the server, use this command to launch CLI client:
```bash
$ docker exec -it cars-demo-node-test npm run client-cli --env-file ./devops/env/.env.prod up -d
```

## Environment

Environment variables are here: ./env. They are connected to the project using npm dotenv + dotenvx.
* for product mode the dotenvx is connected inside the package.json script "start: prod"
* for the dev and debug mode the dotenvx are connected inside the nodemon configuration file (./devops/nodemon-dev.json)
* environment variables are checked when the application is launched. If the variables are invalid, the application throws an error.

## Tests

```bash
# unit tests
$ docker exec -it cars-demo-node-test npm run test:unit
```

```bash
# integration tests
$ docker exec -it cars-demo-node-test npm run test:int
```

```bash
# test coverage
$ docker exec -it cars-demo-node-test npm run test:cov
```

## Comments
I intentionally left the environment variable files and the database backup copy in the project to simplify the testing. 
