import { TypeOrmModuleOptions } from "@nestjs/typeorm";

function ormConfig(): TypeOrmModuleOptions {
    const commonConf = {
        SYNCRONIZE: false,
        ENTITIES: [__dirname + '/domain/*.entity{.ts,.js}'],
        MIGRATIONS: [__dirname + '/migrations/**/*{.ts,.js'],
        CLI: {
            migrationsDir: 'src/migrations',
        },
        MIGRATIONS_RUN: false,
    }

    const ormconfig: TypeOrmModuleOptions = {
        type: 'mariadb',
        host: '1.243.41.144',
        port: 3307,
        username: 'dev01',
        password: 'MariaDB10!@',
        database: 'test',
        entities: commonConf.ENTITIES,
        synchronize: commonConf.SYNCRONIZE,  // 테이블 자동생성 여부
        logging: true,  // query문 로그에 출력
        migrations: commonConf.MIGRATIONS,
        // cli: commonConf.CLI,
        migrationsRun: commonConf.MIGRATIONS_RUN,
    }

    return ormconfig;
}

export { ormConfig }