import { Injectable } from '@nestjs/common';
import SuccessfulResponse from '../Models/Response/SuccessfulResponse';
import { UserDao } from '../Daos/UserDao';
import UtilsFunctions from '../Helpers/Utils/UtilsFunctions';
import PasswordUtils from '../Helpers/Utils/PasswordFunctions';

import { User } from '../Models/Entities/UserEntity';

import { user as UserProto } from '../Protos/User';
import HttpCustomException from 'src/Exceptions/HttpCustomException';
import { StatusCodeEnums } from 'src/Enums/StatusCodeEnums';
import FindUserResponse from '../Models/Response/User/FindUserResponse';
import { RpcException } from '@nestjs/microservices';
import * as grpc from '@grpc/grpc-js';
import { JwtSecurityService } from './Security/JwtSecurityService';

@Injectable()
export class UserService {
    constructor(
        private readonly _userDao: UserDao,
        private readonly _jwtService: JwtSecurityService,
    ) {}

    async create(body: UserProto.CreateUserRequest): Promise<User> {
        const user: User = new User();
        user.setEmail(body.email);
        user.setName(body.name || '');
        user.setLastName(body.last_name || '');
        user.setPassword(await PasswordUtils.getEncryptData(body.password || process.env.PASSWORD_USER_DEFAULT));
        user.setVerificationCode((await UtilsFunctions.generateNumber()).toString());
        user.setExpireVerificationCode((await UtilsFunctions.generateNumber()).toString());
        user.setIsActive(true);
        user.setRefreshToken('123456789');

        const resultUser = await this._userDao.save(user);
        return resultUser;
    }

    async registerUser(body: UserProto.RegisterUserRequest) {
        const findUser: User = await this._userDao.findByEmail(body.email);
        if (findUser) {
            throw new RpcException({
                code: grpc.status.ALREADY_EXISTS,
                message: 'User already exists',
            });
        }
        const user: User = new User();
        user.setEmail(body.email);
        user.setName('');
        user.setLastName('');
        user.setPassword(await PasswordUtils.getEncryptData(body.password || process.env.PASSWORD_USER_DEFAULT));
        user.setVerificationCode((await UtilsFunctions.generateNumber()).toString());
        user.setExpireVerificationCode((await UtilsFunctions.generateNumber()).toString());
        user.setIsActive(true);
        user.setRefreshToken('123456789');

        const resultUser = await this._userDao.save(user);
        return resultUser;
    }

    async registerMediaUser(body: UserProto.RegisterMediaUserRequest) {
        const findUser: User = await this._userDao.findByEmail(body?.email);
        if (findUser) {
            const findUserPermission: string[] = await this._userDao.findUserPermissionByName(body.email);
            const accessToken: string = await this._jwtService.generateAccessToken(findUser.id, findUser?.getRole()?.getName(), findUserPermission);
            const refreshToken: string = await this._jwtService.generateRefreshToken(findUser.id, findUser?.getRole()?.getName(), findUserPermission);
            findUser.setRefreshToken(refreshToken);

            return { user: findUser, accessToken };
        }
        const user: User = new User();
        user.setEmail(body.email);
        user.setName(body?.givenName || '');
        user.setLastName(body?.familyName || '');
        user.setPassword(await PasswordUtils.getEncryptData(process.env.PASSWORD_USER_DEFAULT));
        user.setVerificationCode((await UtilsFunctions.generateNumber()).toString());
        user.setExpireVerificationCode((await UtilsFunctions.generateNumber()).toString());
        user.setIsActive(true);
        user.setRefreshToken('123456789');
        user.setIsSocialMedia(true);

        const resultUser = await this._userDao.save(user);
        const findUserPermission: string[] = await this._userDao.findUserPermissionByName(body.email);
        const accessToken: string = await this._jwtService.generateAccessToken(findUser.id, findUser?.getRole()?.getName(), findUserPermission);

        return { user: resultUser, accessToken };
    }

    async updateUser(body: UserProto.CreateUserRequest) {
        const findUser: User = await this._userDao.findByUuid(body.email);
        if (body?.email) {
            findUser.setEmail(body.email);
        }

        if (body?.name) {
            findUser.setName(body.name);
        }

        if (body?.last_name) {
            findUser.setLastName(body.last_name);
        }

        if (body?.location_s3) {
            findUser.setLocationS3(body.location_s3);
        }

        await this._userDao.save(findUser);
        return new SuccessfulResponse('User update successfully');
    }

    async findById(id: number) {
        const findUser: User = await this._userDao.findById(id);
        if (!findUser) {
            throw new HttpCustomException('User NOT FOUND', StatusCodeEnums.USER_NOT_FOUND);
        }
        return new FindUserResponse(findUser);
    }
}
