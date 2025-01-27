import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from '../Services/UserService';
import { user as UserProto } from '../Protos/User';
import { User } from '../Models/Entities/UserEntity';
@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @GrpcMethod('UserService', 'CreateUser')
    async createUser(data: UserProto.CreateUserRequest) {
        const user = await this.userService.create(data);
        return {
            message: 'User created successfully',
            user: this.toProtoUser(user),
        };
    }

    @GrpcMethod('UserService', 'GetUserByIdRequest')
    async getUser(data: UserProto.GetUserByIdRequest) {
        const user: any = await this.userService.findById(data.id);
        return { user: this.toProtoUser(user) };
    }

    @GrpcMethod('UserService', 'RegisterUser')
    async registerUser(data: UserProto.RegisterUserRequest) {
        const user = await this.userService.registerUser(data);
        return {
            message: 'User created successfully',
            user: this.toProtoUser(user),
        };
    }

    @GrpcMethod('UserService', 'RegisterMediaUser')
    async registerMediaUser(data: UserProto.RegisterMediaUserRequest) {
        const user = await this.userService.registerMediaUser(data);
        return {
            message: 'User created successfully',
            user: this.toProtoUser(user.user),
            token: user.accessToken,
        };
    }

    private toProtoUser(user: User) {
        return {
            id: user?.id,
            name: user?.name,
            email: user?.email,
            address: user?.address,
            refreshToken: user?.refreshToken,
        };
    }
}
