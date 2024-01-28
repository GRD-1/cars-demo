# cars-demo
приложение для хранения и управления базой данных автомобилей различных брендов.
проект состоит из двух частей: 
* сервера, реализующего REST API
* cli клиента для запросов к API

<br>
<p style="display: block; width: 100%; text-align:left;">
  <a href="https://nodejs.org/en/about" target="_blank"><img src="https://img.shields.io/badge/Node.js-v18.16.0-blue?logo=nodedotjs" alt="Node.js Version" /></a>
  <a href="https://www.typescriptlang.org/" target="_blank"><img src="https://img.shields.io/badge/TypeScript-v4.7.4-blue?logo=typescript" alt="TypeScript Version" /></a>
  <a href="" target="_blank"><img src="https://img.shields.io/badge/covarage-91.92%20-%2300c642?style=flat" alt="Coverage" /></a>
  <a href="" rel="nofollow"><img src="https://img.shields.io/badge/istall_size-236%20KB-%23ebdb32?style=flat" alt="install size"></a>
</p>

## Contents
1. [Стек](#Стек)
2. [Запуск](#Запуск)
3. [Использование](#Использование)
4. [Переменные окружения](#Переменные)
5. [Тесты](#Тесты)
6. [Примечание](#Примечание)

## Стек

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

## Запуск

Чтобы запустить проект, установите 
<a href="https://www.docker.com/products/docker-desktop/" target="_blank">Docker</a>
и запустите соответствующую команду в терминале (или нажмите на кнопку play на полях).

* для запуска в development mode:

```bash
$ docker stop $(docker ps -aq)
$ docker-compose -f devops/docker-compose.yml --env-file env/dev.env up -d
$ docker logs cars-demo-node-dev -f --tail 30
```

* для запуска в debug mode:

```bash
$ docker stop $(docker ps -aq)
$ docker-compose -f devops/docker-compose.yml --env-file env/debug.env up -d
$ docker logs cars-demo-node-debug -f --tail 30
```

* для запуска в product mode:

```bash
$ docker stop $(docker ps -aq)
$ docker-compose -f devops/docker-compose.yml --env-file env/prod.env up -d
```

* для запуска в qa mode:

```bash
$ docker stop $(docker ps -aq)
$ docker-compose -f devops/docker-compose.yml --env-file env/qa.env up -d
```

## Использование

* после запуска сервера через докер запустить cli клиент:
```bash
$ docker exec -it cars-demo-node-test npm run client-cli --env-file ./devops/env/.env.prod up -d
```

## Переменные

Переменные окружения тут: ./env. Подключены через npm dotenv + dotenvx.
* для product mode dotenvx подключен в скрипте package.json "start:prod"
* для dev и debug mode dotenvx подключен в конфиге nodemon (./devops/nodemon-dev.json)

## Тесты

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

## Примечание
Я намеренно не исключил переменные окружения и бекап базы из репозитория для удобства тестирования 
