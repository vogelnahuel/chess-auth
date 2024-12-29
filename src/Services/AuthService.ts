import { Injectable } from '@nestjs/common';
import { auth as Auth } from '../Protos/User';
import PasswordUtils from '../Helpers/Utils/PasswordFunctions';
import HttpCustomException from '../Exceptions/HttpCustomException';
import { StatusCodeEnums } from '../Enums/StatusCodeEnums';
import { JwtSecurityService } from './Security/JwtSecurityService';
import { UserDao } from '../Daos/UserDao';
import LoginResponse from '../Models/Response/Login/LoginResponse';

@Injectable()
export class AuthService {
    constructor(
        private readonly _userDao: UserDao,
        private readonly _jwtService: JwtSecurityService,
    ) {}

    async login(data: Auth.LoginRequest): Promise<LoginResponse> {
        const findUser = await this._userDao.findByEmail(data.email);
        const compare = !(await PasswordUtils.getEncryptCompare(data.password, findUser.getPassword()));
        if (!findUser || compare) {
            throw new HttpCustomException(`The username or password is invalid`, StatusCodeEnums.INVALID_PASSWORD_USERNAME);
        }

        const findUserPermission: string[] = await this._userDao.findUserPermissionByName(data.email);
        const accessToken: string = await this._jwtService.generateAccessToken(findUser.id, findUser?.getRole()?.getName(), findUserPermission);
        const refreshToken: string = await this._jwtService.generateRefreshToken(findUser.id, findUser?.getRole()?.getName(), findUserPermission);
        findUser.setRefreshToken(refreshToken);
        await this._userDao.save(findUser);
        return new LoginResponse(accessToken, refreshToken);
    }
}
