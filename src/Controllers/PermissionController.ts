import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { PermissionService } from '../Services/PermissionService';
import { Permission } from '../Models/Entities/PermissionEntity';
import { permission as PermissionProto } from '../Protos/Permission';

@Controller()
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) {}

    @GrpcMethod('PermissionService', 'CreatePermission')
    async createPermission(data: PermissionProto.CreatePermissionRequest) {
        const permission = await this.permissionService.create(data);
        return {
            message: 'Permission created successfully',
            permission: this.toProtoPermission(permission),
        };
    }

    @GrpcMethod('PermissionService', 'GetPermission')
    async getPermission(data: PermissionProto.GetPermissionRequest) {
        const permission = await this.permissionService.findById(data.id);
        return { permission: this.toProtoPermission(permission) };
    }

    @GrpcMethod('PermissionService', 'GetAllPermissions')
    async getAllPermissions() {
        const permissions: any = await this.permissionService.findAll();
        return {
            permissions: permissions.map((permission: any) => this.toProtoPermission(permission)),
        };
    }

    @GrpcMethod('PermissionService', 'UpdatePermission')
    async updatePermission(data: PermissionProto.UpdatePermissionRequest) {
        const updatedPermission: any = await this.permissionService.update(data);
        return {
            message: 'Permission updated successfully',
            permission: this.toProtoPermission(updatedPermission),
        };
    }

    @GrpcMethod('PermissionService', 'DeletePermission')
    async deletePermission(data: PermissionProto.DeletePermissionRequest) {
        await this.permissionService.remove(data.id);
        return { message: 'Permission deleted successfully' };
    }

    private toProtoPermission(permission: Permission) {
        return {
            id: permission.id,
            name: permission.name,
            users: permission.users
                ? permission.users.map((user) => ({
                      id: user.id,
                      name: user.name,
                      email: user.email,
                  }))
                : [],
        };
    }
}
