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

    @GrpcMethod('UserService', 'GetUser')
    async getUser(data: UserProto.GetUserRequest) {
        const user: any = await this.userService.findById(data.id);
        return { user: this.toProtoUser(user) };
    }

    private toProtoUser(user: User) {
        return {
            id: user?.id,
            name: user?.name,
            email: user?.email,
            address: user?.address,
        };
    }
}
