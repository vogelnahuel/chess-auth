import { Controller, OnModuleInit } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthService } from '../Services/AuthService';
import {
    LoginRequest,
    LoginResponse,
    ValidateTokenRequest,
    ValidateTokenResponse,
    RefreshTokenRequest,
    RefreshTokenResponse,
} from '../Proto/UserProto.proto';

@Controller()
export class AuthController implements OnModuleInit {
    constructor(private readonly authService: AuthService) {}

    @GrpcMethod('AuthService', 'Login')
    async login(data: LoginRequest): Promise<LoginResponse> {
        return await this.authService.login(data.email, data.password);
    }

    @GrpcMethod('AuthService', 'ValidateToken')
    async validateToken(data: ValidateTokenRequest): Promise<ValidateTokenResponse> {
        return await this.authService.validateToken(data.token);
    }

    @GrpcMethod('AuthService', 'RefreshToken')
    async refreshToken(data: RefreshTokenRequest): Promise<RefreshTokenResponse> {
        return await this.authService.refreshToken(data.refreshToken);
    }

    onModuleInit() {
        console.log('AuthController initialized.');
    }
}
