import { Role } from 'src/Models/Entities/Role/RoleEntity';

export class FindRoleResponse {
    id: number;
    uuid: string;
    description: string;
    name: string;

    constructor(role: Role) {
        this.id = role.id || null;
        this.uuid = role.getUuid() || null;
        this.description = role.getDescription() || null;
        this.name = role.getName() || null;
    }
}
