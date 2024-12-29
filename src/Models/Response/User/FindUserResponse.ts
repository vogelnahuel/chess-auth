import { User } from 'src/Models/Entities/User/UserEntity';

export default class FindUserResponse {
    id: number;
    uuid: string;
    name: string;
    lastName: string;
    email: string;
    verificationCode: number;
    expireVerificationCode: number;
    isActive: boolean;
    locationS3: string;
    refreshToken: string;

    constructor(user: User) {
        this.id = user.id ?? null;
        this.uuid = user.getUuid() ?? null;
        this.name = user.getName() ?? null;
        this.lastName = user.getLastName() ?? null;
        this.email = user.getEmail() ?? null;
        this.verificationCode = user.getVerificationCode() ?? null;
        this.expireVerificationCode = user.getExpireVerificationCode() ?? null;
        this.isActive = user.getIsActive() ?? null;
        this.locationS3 = user.getLocationS3() ?? null;
        this.refreshToken = user.getRefreshToken() ?? null;
    }
}
