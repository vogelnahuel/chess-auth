import { Role } from '../../Entities/RoleEntity';
export class FindRoleResponse {
    id: number;
    uuid: string;
    description: string;
    name: string;

    constructor(role: Role) {
        this.id = role.id || null;
        this.name = role.getName() || null;
    }
}
