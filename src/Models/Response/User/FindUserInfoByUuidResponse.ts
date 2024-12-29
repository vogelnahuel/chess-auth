import { Permission } from 'src/Models/Entities/Permission/PermissionEntity';
import { Role } from 'src/Models/Entities/Role/RoleEntity';
import { User } from 'src/Models/Entities/User/UserEntity';

export class FindUserInfoByUuidResponse {
    id: number;
    uuid: string;
    name: string;
    lastName: string;
    email: string;
    locationS3: string;
    role: Role;
    permissions: Permission[];

    constructor(user: User) {
        this.id = user.id || null;
        this.uuid = user.getUuid() || null;
        this.name = user.getName() || null;
        this.lastName = user.getLastName() || null;
        this.email = user.getEmail() || null;
        this.locationS3 = user.getLocationS3() || null;
        this.role = user.getRoleId() || null;
        this.permissions = user.getUserPermission() || null;
    }
}
