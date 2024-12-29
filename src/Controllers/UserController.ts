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
        const user = await this.userService.findById(data.id);
        return { user: this.toProtoUser(user) };
    }

    @GrpcMethod('UserService', 'UpdateUser')
    async updateUser(data: UserProto.UpdateUserRequest){
        const updatedUser = await this.userService.update(data);
        return {
            message: 'User updated successfully',
            user: this.toProtoUser(updatedUser),
        };
    }

    @GrpcMethod('UserService', 'DeleteUser')
    async deleteUser(data: UserProto.DeleteUserRequest) {
        await this.userService.remove(data.id);
        return { message: 'User deleted successfully' };
    }

    private toProtoUser(user: User) {
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
