import { Injectable } from '@nestjs/common';
import { auth as Auth } from '../Protos/Login';
import PasswordUtils from '../Helpers/Utils/PasswordFunctions';
import { JwtSecurityService } from './Security/JwtSecurityService';
import { UserDao } from '../Daos/UserDao';
import LoginResponse from '../Models/Response/Login/LoginResponse';
import { RpcException } from '@nestjs/microservices';
import * as grpc from '@grpc/grpc-js';

@Injectable()
export class AuthService {
    constructor(
        private readonly _userDao: UserDao,
        private readonly _jwtService: JwtSecurityService,
    ) {}

    async login(data: Auth.LoginRequest): Promise<LoginResponse> {
        const findUser = await this._userDao.findByEmail(data.email);
        if (!findUser) {
            throw new RpcException({
                code: grpc.status.NOT_FOUND,
                message: 'The username or password is invalid',
            });
        }
        const compare = !(await PasswordUtils.getEncryptCompare(data.password, findUser.getPassword()));
        if (!findUser || compare) {
            throw new RpcException({
                code: grpc.status.NOT_FOUND,
                message: 'The username or password is invalid',
            });
        }

        const findUserPermission: string[] = await this._userDao.findUserPermissionByName(data.email);
        const accessToken: string = await this._jwtService.generateAccessToken(findUser.id, findUser?.getRole()?.getName(), findUserPermission);
        const refreshToken: string = await this._jwtService.generateRefreshToken(findUser.id, findUser?.getRole()?.getName(), findUserPermission);
        findUser.setRefreshToken(refreshToken);
        await this._userDao.save(findUser);

        return new LoginResponse(accessToken, refreshToken);
    }
}
