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

## 13.인증 - 회원가입 #2

## 14.인증 - 로그인 #1

## 15.인증 - 비밀번호 암호화(bcrypt)

설명 : https://npmjs.com/package/bcrypt

```bash
npm install --save bcrypt @types/bcrypt
```

```bash
import * as bcrypt from 'bcrypt';

# 패스워드 암호화
# bcrypt.hash(암호화할문자, 솔트횟수);
memberDTO.password = await bcrypt.hash(memberDTO.password, 10);

# 패스워드 비교
# bcrypt.compare(비암호문자, 암호문자)
const validatePassword = await bcrypt.compare(memberDTO.password, memberFind.password);
```

## 16.인증 - JWT 토큰 사용법과 토큰 생성하기

```bash
npm install --save @nestjs/jwt
```


```bash
import { JwtModule } from '@nestjs/jwt';

imports: [
    JwtModule.register({
        secret: 'SECRET',  // JWT 암호화 문자열
        signOptions: { expiresIn: '300s' },  // 사용시간
    })
]
```

##  17.인증 - JWT 토큰 인증(Guard)

```bash
npm i --save @nestjs/passport @types/passport-jwt passport-jwt
```

```bash
# payload.interface.ts
export interface Payload {
    id: number;
    username: string;
}
```

```bash
# passport.jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { Payload } from './payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private authService: AuthService) {
        // Bearer 토큰 을 받아서 검증한다.
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: 'SECRET_KEY'
        })
    }

    // Payload는 위 supper에서 암호를 풀어서 나온 payload값이다.
    // Payload 값에서 사용자 정보를 조회한다.
    async validate(payload: Payload, done: VerifiedCallback): Promise<any> {
        const member = await this.authService.tokenValidateMember(payload);
        if ( !member ) {
            return done(new UnauthorizedException({message: 'user does not exist'}), false);
        }

        // Request.member에 member값을 넣어준다. req.user 에 값이 들어간다.
        return done(null, member);
    }
}
```

```bash
# auth.service.ts
...
    // payload로 사용자 정보 조회
    async tokenValidateMember(payload: Payload): Promise<Member | undefined> {
        return await this.memberService.findByFields({
            where: {id: payload.id}
        })
    }
...
```

```bash
# auth.guard.ts
import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';
import { Observable } from "rxjs";

/**
 * UseGuard에 넣어 주면 Request에 member값을 반환한다.
 */
@Injectable()
export class AuthGuard extends NestAuthGuard('jwt') {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context);
    }
}
```

```bash
# auth.controller.ts
    @Get('/authenticate')
    @UseGuards(AuthGuard)
    isAuthenticated(@Req() req: Request): any {
        const member: any = req.user;
        return member;
    }
...
```

```bash
# auth.module.ts
@Module({
  imports: [
    TypeOrmModule.forFeature([Member]),
    JwtModule.register({
      secret: "SECRET_KEY",
      signOptions: {expiresIn: '300s'}
    }),
    PassportModule   // PassportModule 추가
  ],
  exports: [TypeOrmModule],
  controllers: [AuthController],
  providers: [AuthService, MemberService, JwtStrategy]   // JwtStrategy 추가
})
export class AuthModule {}
```

```bash
# swagger에서 auth bearer 토큰 사용방법
# swagger.ts
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
    'JWT-auth')    // @ApiBearerAuth('JWT-auth') 토큰이 필요한 컨트롤에서 사용

# auth.controller.ts
    @Get('/authenticate')
    @UseGuards(AuthGuard)
    @ApiBearerAuth('JWT-auth')  // swagger의 option에 설정되있는 명
    @ApiOperation({ summary: 'Jwt Auth', description: 'Jwt Auth' })
    @ApiCreatedResponse({ description: '{"username":"coder3","password":"3333"}', type: Member })
    isAuthenticated(@Req() req: Request): any {
        const member: any = req.user;
        return member;
    }
```

## 18.인증 - 권한관리(RoleGuard) #1

[MEMBER](1)--------------(N)[MEMBER_AUTHORITY]

```bash
CREATE TABLE IF NOT EXISTS test.member_authority (
    id INT NOT NULL AUTO_INCREMENT,
    member_id INT NOT NULL,
    authority_name ENUM('ROLE_USER', 'ROLE_ADMIN') NOT NULL,
    PRIMARY KEY (id)
)
ENGINE = InnoDB
```

member-authority repository 추가

## 19.인증 - 권한관리(RoleGuard) #2

## 20.인증 - 권한관리(RoleGuard) #3

## 21.인증 - 권한관리(RoleGuard) #4

## 22.TypeORM 설정 파일 분리

## 23.파라메터 Null 체크 - ValidationPipe
```bash
npm i --save class-validator
npm i class-transformer
```

```bash
https://github.com/typestack/class-validator#manual-validation
```

## 24.쿠키다루기(JWT토큰)

- res.cookie를 이용해서 jwt토큰 값을 전달합니다.
- res.cookie의 인자는 (key, value, option)으로 구성됩니다.
- option에는 httpOnly는 브라우저에서 cookie를 이용할 수 없게 합니다. 따라서 XXS 등의 보안을 강화시킬 수 있습니다.
- maxAge는 쿠키의 유효기간을 설정할 수 있습니다.

```bash
npm i cookie-parser @types/cookie-parser
```

## 25.환경설정 파일(개발/운영 분리)

```bash
npm i @nestjs/config
```

개발과 운영을 다르게 설치하기 위해 yaml을 설치한다.
```bash
npm -i js-yaml @types/js-yaml
```

yaml 파일은 build할때 복사가 되지 않으므로 build폴더로 복사를 해주어야 한다.
아래 패키지를 설치하고 pakcage.json 파일을 수정한다.
```bash
npm i cpx
```

"script": {
    "copy-files": "cpx \"src/config/*.yaml\" dist/config",
    "build": "npm run copy-files && nest build",
    "start": "npm run copy-files && nest build && nest start",
    "start:dev", "start:debug", "start:prod"에도 넣어준다.
    ...
}

* 위의 방법으로 하면 파일 복사 후 dist 폴더가 삭제되고 컴파일 되면서 다시 생성된다 그래서 복사된 파일이 삭제처리된다.
* 해결방법은 nest-cli.json 파일을 수정하는방법이다.
```json
{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "assets": ["**/*.yaml"]
  }
}
```