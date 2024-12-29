import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { RoleService } from '../Services/RoleService';
import { RoleProto } from '../Protos/RoleProto';
import { Role } from '../Entities/RoleEntity';

@Controller()
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @GrpcMethod('RoleService', 'CreateRole')
    async createRole(data: RoleProto.CreateRoleRequest): Promise<RoleProto.CreateRoleResponse> {
        const role = await this.roleService.create(data);
        return {
            message: 'Role created successfully',
            role: this.toProtoRole(role),
        };
    }

    @GrpcMethod('RoleService', 'GetRole')
    async getRole(data: RoleProto.GetRoleRequest): Promise<RoleProto.GetRoleResponse> {
        const role = await this.roleService.findById(data.id);
        return { role: this.toProtoRole(role) };
    }

    @GrpcMethod('RoleService', 'UpdateRole')
    async updateRole(data: RoleProto.UpdateRoleRequest): Promise<RoleProto.UpdateRoleResponse> {
        const updatedRole = await this.roleService.update(data);
        return {
            message: 'Role updated successfully',
            role: this.toProtoRole(updatedRole),
        };
    }

    @GrpcMethod('RoleService', 'DeleteRole')
    async deleteRole(data: RoleProto.DeleteRoleRequest): Promise<RoleProto.DeleteRoleResponse> {
        await this.roleService.remove(data.id);
        return { message: 'Role deleted successfully' };
    }

    private toProtoRole(role: Role): RoleProto.Role {
        return {
            id: role.id,
            name: role.name,
            users: role.users.map((user) => ({
                id: user.id,
                name: user.name,
                email: user.email,
                role_id: user.role.id.toString(),
            })),
        };
    }
}
