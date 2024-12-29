import { Permission } from 'src/Models/Entities/Permission/PermissionEntity';
import { PermissionType } from 'src/Models/Entities/Permission/PermissionTypeEntity';

export default class FindPermissionByIdsResponse {
    description: string;
    name: string;
    id: number;
    permissionTypeId: PermissionType;

    constructor(permission: Permission) {
        this.permissionTypeId = permission?.getPermissionTypeId() ?? null;
        this.description = permission?.getDescription() ?? null;
        this.name = permission?.getName() ?? null;
        this.id = permission?.id || 0;
    }
}
