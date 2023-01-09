## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 03. Nestjs의 구조

<<<<<<< HEAD
Root Module  <--- [User Module, Order Module, Chat Module]
=======
                ┌ User Module
Root Module  <--+ Order Module
                └ Chat Module
>>>>>>> nestjs-start/master

Module       <--- [Controller, Provider]

Client       <--> Controller <--> Provider
<<<<<<< HEAD

## 04.소스 자동 생성하기

```bash
# users 모둘 생성
> nest g module users

# users 컨트롤러 생성
> nest g controller user

# users 서비스 생성
> nest g service users
```
=======
>>>>>>> nestjs-start/master
