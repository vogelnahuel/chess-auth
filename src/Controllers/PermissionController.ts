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
        const permission: any = await this.permissionService.create(data);
        return {
            message: 'Permission created successfully',
            permission: this.toProtoPermission(permission),
        };
    }

    @GrpcMethod('PermissionService', 'GetAllPermissions')
    async getAllPermissions() {
        const permissions: any = await this.permissionService.findAll();
        return {
            permissions: permissions.map((permission: any) => this.toProtoPermission(permission)),
        };
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
