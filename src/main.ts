import helmet from 'helmet';
import * as BodyParser from 'body-parser';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './AppModule';
import { CustomLogger } from './Helpers/Middlewares/CustomLogger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );
    app.useLogger(app.get(CustomLogger));
    app.use(helmet());

    // Configurar el microservicio gRPC
    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.GRPC,
        options: {
            package: ['user', 'role', 'permission', 'auth'], // Nombres de los paquetes definidos en tus archivos `.proto`
            protoPath: [
                join(__dirname, './Protos/User.proto'), // Ruta relativa al archivo User.proto
                join(__dirname, './Protos/Role.proto'), // Ruta relativa al archivo Role.proto
                join(__dirname, './Protos/Permission.proto'), // Ruta relativa al archivo Permission.proto
                join(__dirname, './Protos/Login.proto'), // Ruta relativa al archivo Login.proto
            ],
            url: '0.0.0.0:50051', // Dirección y puerto para gRPC
        },
    });

    app.use(BodyParser.json());
    app.use(BodyParser.urlencoded({ extended: true }));
    app.setGlobalPrefix('api/v1/auth-seed-ms');
    app.enableCors();
    await app.startAllMicroservices(); // Inicia el microservicio gRPC
    await app.listen(configService.get<string>('PORT'));

    console.log('Application is running:');
    console.log('- HTTP: http://localhost:3000');
    console.log('- gRPC: 0.0.0.0:50051');
}
bootstrap();
