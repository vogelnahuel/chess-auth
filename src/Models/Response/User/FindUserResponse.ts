import { User } from '../../Entities/UserEntity';
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
        this.name = user.getName() ?? null;
        this.lastName = user.getLastName() ?? null;
        this.email = user.getEmail() ?? null;
        this.isActive = user.getIsActive() ?? null;
        this.locationS3 = user.getLocationS3() ?? null;
        this.refreshToken = user.getRefreshToken() ?? null;
    }
}
