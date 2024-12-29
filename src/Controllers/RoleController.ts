import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { RoleService } from '../Services/RoleService';
import { Role } from '../Models/Entities/RoleEntity';
import { role as RoleProto } from '../Protos/Role';

@Controller()
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @GrpcMethod('RoleService', 'CreateRole')
    async createRole(data: RoleProto.CreateRoleRequest) {
        const role = await this.roleService.create(data);
        return {
            message: 'Role created successfully',
            role: this.toProtoRole(role),
        };
    }

    @GrpcMethod('RoleService', 'GetRole')
    async getRole(data: RoleProto.GetRoleRequest) {
        const role: any = await this.roleService.findById(data.id);
        return { role: this.toProtoRole(role) };
    }

    @GrpcMethod('RoleService', 'UpdateRole')
    async updateRole(data: RoleProto.UpdateRoleRequest) {
        const updatedRole = await this.roleService.update(data);
        return {
            message: 'Role updated successfully',
            role: this.toProtoRole(updatedRole),
        };
    }

    @GrpcMethod('RoleService', 'DeleteRole')
    async deleteRole(data: RoleProto.DeleteRoleRequest) {
        await this.roleService.remove(data.id);
        return { message: 'Role deleted successfully' };
    }

    private toProtoRole(role: Role) {
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
