import { DataSource } from 'typeorm';

import * as Dotenv from 'dotenv';
import * as path from 'path';
import * as logger from 'better-console-log-plus';
import { envModelTransformer } from './src/Configs/NestEnvConfig';
import { envFilePathConfiguration } from './src/Configs/EnvFilePathConfig';

let envs;

if (process.env.CHESS_MS === 'local') {
    const envData = Dotenv.config({
        path: `${path.join(process.env.PWD)}/${envFilePathConfiguration()}`,
    }).parsed;
    logger.info(`TYPEORM ENVIRONMENT: ${process.env.CHESS_MS}\nDATABASE CONNECTION: ${process.env.DATABASE_HOST}`);
    envs = envModelTransformer(envData);
} else {
    logger.info(`TYPEORM ENVIRONMENT: ${process.env.CHESS_MS}\nDATABASE CONNECTION: ${process.env.DATABASE_HOST}`);
    envs = envModelTransformer(process.env);
}

export const connectionSource = new DataSource({
    migrationsTableName: 'migrations',
    type: envs.DATABASE.type || 'postgres',
    host: envs.DATABASE.host || 'localhost',
    port: envs.DATABASE.port || 5432,
    username: envs.DATABASE.username || 'chess_ms',
    password: envs.DATABASE.password || 'chess_ms',
    database: envs.DATABASE.database || 'chess_ms',
    logging: false,
    synchronize: envs.DATABASE.synchronize,
    migrations: ['src/Migrations/**/*.{ts,js}'],
    entities: ['src/Models/Entities/**/*.{ts,js}'],
});

connectionSource
    .initialize()
    .then(() => logger.info('Connection to database established'))
    .catch((error) => logger.error('TypeORM connection error: ', error));
