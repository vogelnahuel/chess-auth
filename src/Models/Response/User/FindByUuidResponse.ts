import { Permission } from 'src/Models/Entities/Permission/PermissionEntity';
import { User } from 'src/Models/Entities/User/UserEntity';

export default class FindByUuidResponse {
    id: number;
    uuid: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    verificationCode: number;
    expireVerificationCode: number;
    isActive: boolean;
    locationS3: string;
    refreshToken: string;
    permission: Permission[];

    constructor(user: User) {
        this.id = user.id ?? 0;
        this.uuid = user.getUuid() ?? null;
        this.name = user.getName() ?? null;
        this.lastName = user.getLastName() ?? null;
        this.email = user.getEmail() ?? null;
        this.password = user.getPassword() ?? null;
        this.verificationCode = user.getVerificationCode() ?? null;
        this.expireVerificationCode = user.getExpireVerificationCode() ?? null;
        this.isActive = user.getIsActive() ?? null;
        this.locationS3 = user.getLocationS3() ?? null;
        this.refreshToken = user.getRefreshToken() ?? null;
        this.permission = user.getUserPermission() ?? null;
    }
}
