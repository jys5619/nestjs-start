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


## 06.컨트롤러 실습

~

## 07.서비스만들기

* provider는 services, repositories, factories, helpers 등이 있습니다.


## 08.미들웨어

미들웨어는 라우터 핸들러 이전에 호출되는 함수입니다.

[Client Side] ----(HTTP Reuqest)----> [Middleware] --------> [Route Handler]

* 모든 코드가 공통으로 실행해야 하는 인증, 로깅등을 처리할 수 있다.
* 요청과 응답 객체를 변경할 수 있다.
* 요청의 validation을 체크하여 오류 처리를 할 수 있다.

```bash
#################################################################
# NestMiddleware 인터페이스를 추가한다.
#################################################################
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('Request...');
        next();
    }
}

# app.module.ts에서 configure에 추가 해주어야한다.
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';
import { CatsController } from './cats/cats.controller';

@Module({
    imports: [CatsModule],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes('cats');
    }
}

# forRoutes에 path를 패턴 방식으로 이용하거나 메서드를 설정할 수 있다.
.forRoutes({ path: 'ab*cd', method: RequestMethod.ALL});    // path를 패턴 방식으로 이용
.forRoutes({ path: 'cats', method: RequestMethod.GET});    //  메서드를 설정
.forRoutes(CatsController)    // 컨트롤러로 설정

# 예외 처리
consumer
    .apply(LoggerMiddleware)
    .exclude(
        { path: 'cats', method: RequestMethod.GET },
        { path: 'cats', method: RequestMethod.POST },
        'cats/(.*)',
    )
    .forRoutes(CatsController);

#################################################################
# Functional 미들웨어
#################################################################

# logger.middleware.ts
import { Request, Response, NextFunction } from 'express';

export function loggger(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
}

# app.modules
consumer
    .apply(logger)
    .forRoutes(CatsController);

# 여러개의 미들웨어 사용
consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);

#################################################################
# Global 미들웨어 
#################################################################

# Functional 미들웨어만 사용가능하다.

const app = await NestFactory.create(AppModule);
app.use(logger);
await app.listen(3000);
```

## 10.TypeORM으로 데이터 컨트롤하기 #1

```bash
# 테스트 스크마 생성
CREATE SCHEMA test DEFAULT CHARACTER SET UTF8 COLLATE utf8_unicode_ci;

# 모듈 설치
npm install --save @nestjs/typeorm typeorm mysql2

# app.module.ts @Module 설정
# synchronize: true 운영모드에서는 사용하면 안됨.
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mariadb',
            host: '1.243.41.144',
            port: 3307,
            username: 'dev01',
            password: 'MariaDB10!@',
            database: 'test',
            entities: [],
            synchronize: true,
        }),
        UsersModule, CatsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
```

## [번외] nestjs swagger 설치및 설정

```bash
npm install --save @nestjs/swagger swagger-ui-express

# main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { setupSwagger } from 'src/util/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ... 생략
  setupSwagger(app);

  await app.listen(3000);
}

void bootstrap();

# src/util/swagger.ts
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

/**
 * Swagger 세팅
 *
 * @param {INestApplication} app
 */
export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('NestJS Study API Docs')
    .setDescription('NestJS Study API description')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
}

# 어노테이션으로 설정한다.
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('v1/users')
@ApiTags('유저 API')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: '유저 생성 API', description: '유저를 생성한다.' })
  @ApiCreatedResponse({ description: '유저를 생성한다.', type: User })
  async create(@Body() requestDto: UserCreateRequestDto, @Res() res: Response) {
    const user: User = await this.userService.createUser(requestDto);

    return res.status(HttpStatus.CREATED).json(user);
  }
}
```
## 11.TypeORM으로 데이터 컨트롤하기 #2

## 12.인증 - 회원가입 #1

