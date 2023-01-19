import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/users.entity';
import { AuthModule } from './auth/auth.module';
import { Member } from './domain/member.entity';
import { MemberAuthority } from './domain/member-authority.entity';
import { ormConfig } from './orm.config';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [config],
            isGlobal: true
        }),
        TypeOrmModule.forRootAsync({useFactory: ormConfig}),
        UsersModule, CatsModule, AuthModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('cats', 'users');
    }
}
