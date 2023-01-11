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

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mariadb',
            host: '1.243.41.144',
            port: 3307,
            username: 'dev01',
            password: 'MariaDB10!@',
            database: 'test',
            entities: [User, Member],
            synchronize: true,
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
