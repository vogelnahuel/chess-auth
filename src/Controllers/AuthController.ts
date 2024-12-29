import { Controller, OnModuleInit } from '@nestjs/common';
import Response from '../Helpers/Formatter/Response';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthService } from '../Services/AuthService';
import { auth as Auth } from '../Protos/Login';
import LoginResponse from '../Models/Response/Login/LoginResponse';

@Controller()
export class AuthController implements OnModuleInit {
    constructor(private readonly authService: AuthService) {}

    @GrpcMethod('AuthService', 'Login')
    async login(data: Auth.LoginRequest): Promise<Response<LoginResponse>> {
        const response = await this.authService.login(data);
        return Response.create<LoginResponse>(response);
    }

    onModuleInit() {
        console.log('AuthController initialized.');
    }
}
