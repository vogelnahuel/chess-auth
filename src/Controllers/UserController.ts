import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from '../Services/UserService';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @GrpcMethod('UserService', 'CreateUser')
    async createUser(data: UserProto.CreateUserRequest): Promise<UserProto.CreateUserResponse> {
        const user = await this.userService.create(data);
        return {
            message: 'User created successfully',
            user: this.toProtoUser(user),
        };
    }

    @GrpcMethod('UserService', 'GetUser')
    async getUser(data: UserProto.GetUserRequest): Promise<UserProto.GetUserResponse> {
        const user = await this.userService.findById(data.id);
        return { user: this.toProtoUser(user) };
    }

    @GrpcMethod('UserService', 'UpdateUser')
    async updateUser(data: UserProto.UpdateUserRequest): Promise<UserProto.UpdateUserResponse> {
        const updatedUser = await this.userService.update(data);
        return {
            message: 'User updated successfully',
            user: this.toProtoUser(updatedUser),
        };
    }

    @GrpcMethod('UserService', 'DeleteUser')
    async deleteUser(data: UserProto.DeleteUserRequest): Promise<UserProto.DeleteUserResponse> {
        await this.userService.remove(data.id);
        return { message: 'User deleted successfully' };
    }

    private toProtoUser(user: User): UserProto.User {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            address: user.address,
            role_id: user.role.id.toString(),
            permissions: user.permissions.map((permission) => permission.id.toString()),
        };
    }
}
