import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMQConfig, RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomLogger } from '../Helpers/Middlewares/CustomLogger';
import { importAllFromRequireContext } from '../Helpers/Utils/RequireContext';

@Module({
    imports: [
        RabbitMQModule.forRootAsync(RabbitMQModule, {
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => Object.assign(configService.get<RabbitMQConfig>('RABBITMQ')),
        }),
        TypeOrmModule.forFeature(importAllFromRequireContext(require.context('../Models/Entities/', true, /Entity\.ts$/))),
        JwtModule.register({}),
    ],
    providers: [
        ...importAllFromRequireContext(require.context('../Services/', true)),
        ...importAllFromRequireContext(require.context('../Daos/', true)),
        ...importAllFromRequireContext(require.context('../WebServices/', true)),
        CustomLogger,
    ],
    controllers: importAllFromRequireContext(require.context('../Controllers/', true)),
    exports: [TypeOrmModule, CustomLogger],
})
export class ApplicationModule {}
