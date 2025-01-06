import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthService } from '../Services/AuthService';
import { auth as Auth } from '../Protos/Login';
import LoginResponse from 'src/Models/Response/Login/LoginResponse';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @GrpcMethod('AuthService', 'Login')
    async login(data: Auth.LoginRequest) {
        const response: LoginResponse = await this.authService.login(data);

        console.log({
            message: 'Login successfully',
            login: this.toProtoLogin(response),
        });
        return {
            message: 'Login successfully',
            login: this.toProtoLogin(response),
        };
    }

    private toProtoLogin(user: LoginResponse) {
        return {
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
        };
    }
}
