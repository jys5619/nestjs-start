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

Root Module  <--- [User Module, Order Module, Chat Module]

Module       <--- [Controller, Provider]

Client       <--> Controller <--> Provider
