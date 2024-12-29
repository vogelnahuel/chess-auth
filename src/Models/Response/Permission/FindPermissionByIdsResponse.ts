import { Permission } from '../../Entities/PermissionEntity';

export default class FindPermissionByIdsResponse {
    description: string;
    name: string;
    id: number;

    constructor(permission: Permission) {
        this.name = permission?.getName() ?? null;
        this.id = permission?.id || 0;
    }
}
