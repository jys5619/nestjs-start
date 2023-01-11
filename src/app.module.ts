import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entity/users.entity';
import { AuthModule } from './auth/auth.module';
import { Member } from './auth/entity/member.entity';
import { MemberAuthority } from './auth/entity/member-authority.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mariadb',
            host: '1.243.41.144',
            port: 3307,
            username: 'dev01',
            password: 'MariaDB10!@',
            database: 'test',
            entities: [User, Member, MemberAuthority],
            synchronize: false,  // 테이블 자동생성 여부
            logging: true  // query문 로그에 출력
        }),
        UsersModule, CatsModule, AuthModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('cats', 'users');
    }
}
