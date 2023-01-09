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

## 04.소스 자동 생성하기

```bash
# users 모둘 생성
> nest g module users

# users 컨트롤러 생성
> nest g controller user

# users 서비스 생성
> nest g service users
```

## 05.컨트롤러

```bash
@Controller
@Controller('cats')  -> http://localhost:3000/cats

@Get, @Post, @Put, @Delete
@Get('profile')   ->  http://localhost:3000/cats/profile
```

```bash
# Request 객체
import { Request } from 'express';

@Get()
findAll(@Req() request: Request): string {
    console.log(request);
    return 'return text';
}
```

```bash
# Route parameters
# http://localhost:3000/cats/1
@Get(':id')
findOne(@Param() params): string {
    console.log(params.id);
    return `id : ${params.id}`;
}

OR

@Get(':id')
findOne(@Param('id') id: string): string {
    console.log(id);
    return `id : ${id}`;
}
```

```bash
# 비동기 처리
@Get()
async findAll(): Promise<any[]> {
    return [];
}
```

```bash
# DTO
export class CreateCatDto {
    name: string;
    age: number;
    breed: string;
}

@Post
async create(@Body() createCatDto: CreateCatDto) {
    return 'cat';
}
```

```bash
# fineAll : 전체 데이터 목록 조회
# findOne : 데이터 상세 조회
# create : 데이터 생성
# update : 데이터 수정
# remove : 데이터 삭제

import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateCatDto, UpdateCatDto, ListAllEntities } from '.dto';

@Controller('cat')
export class CatsController {
    @Post()
    create(@Body() createCatDto: CreateCatDto) {
        return 'This action adds a new cat';
    }

    @Get()
    findAll(@Query() query: listAllEntities) {
        return `This action returns all cats (limit: @query.limit} items)`;
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return `This action returns a #${id} cat`;
    }

    @Put(':id')
    updqte(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
        return `This action updates a #${id} cat`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action removes a #${id} cat`;
    }
}
```

