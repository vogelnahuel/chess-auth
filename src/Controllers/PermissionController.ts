import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { PermissionService } from '../Services/PermissionService';
import { PermissionProto } from '../Protos/PermissionProto';
import { Permission } from '../Entities/PermissionEntity';

@Controller()
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) {}

    @GrpcMethod('PermissionService', 'CreatePermission')
    async createPermission(data: PermissionProto.CreatePermissionRequest): Promise<PermissionProto.CreatePermissionResponse> {
        const permission = await this.permissionService.create(data);
        return {
            message: 'Permission created successfully',
            permission: this.toProtoPermission(permission),
        };
    }

    @GrpcMethod('PermissionService', 'GetPermission')
    async getPermission(data: PermissionProto.GetPermissionRequest): Promise<PermissionProto.GetPermissionResponse> {
        const permission = await this.permissionService.findById(data.id);
        return { permission: this.toProtoPermission(permission) };
    }

    @GrpcMethod('PermissionService', 'GetAllPermissions')
    async getAllPermissions(): Promise<PermissionProto.GetAllPermissionsResponse> {
        const permissions = await this.permissionService.findAll();
        return {
            permissions: permissions.map((permission) => this.toProtoPermission(permission)),
        };
    }

    @GrpcMethod('PermissionService', 'UpdatePermission')
    async updatePermission(data: PermissionProto.UpdatePermissionRequest): Promise<PermissionProto.UpdatePermissionResponse> {
        const updatedPermission = await this.permissionService.update(data);
        return {
            message: 'Permission updated successfully',
            permission: this.toProtoPermission(updatedPermission),
        };
    }

    @GrpcMethod('PermissionService', 'DeletePermission')
    async deletePermission(data: PermissionProto.DeletePermissionRequest): Promise<PermissionProto.DeletePermissionResponse> {
        await this.permissionService.remove(data.id);
        return { message: 'Permission deleted successfully' };
    }

    @GrpcMethod('PermissionService', 'AssignUsers')
    async assignUsers(data: PermissionProto.AssignUsersRequest): Promise<PermissionProto.AssignUsersResponse> {
        const permission = await this.permissionService.assignUsers(data);
        return {
            message: 'Users assigned to permission successfully',
            permission: this.toProtoPermission(permission),
        };
    }

    @GrpcMethod('PermissionService', 'UnassignUsers')
    async unassignUsers(data: PermissionProto.UnassignUsersRequest): Promise<PermissionProto.UnassignUsersResponse> {
        const permission = await this.permissionService.unassignUsers(data);
        return {
            message: 'Users unassigned from permission successfully',
            permission: this.toProtoPermission(permission),
        };
    }

    private toProtoPermission(permission: Permission): PermissionProto.Permission {
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
