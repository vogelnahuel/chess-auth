import { Injectable } from '@nestjs/common';
import HttpCustomException from '../Exceptions/HttpCustomException';
import { StatusCodeEnums } from '../Enums/StatusCodeEnums';
import SuccessfulResponse from '../Models/Response/SuccessfulResponse';
import { UserDao } from '../Daos/UserDao';
import UtilsFunctions from '../Helpers/Utils/UtilsFunctions';
import PasswordUtils from '../Helpers/Utils/PasswordFunctions';

import { User } from '../Models/Entities/UserEntity';
import { Role } from '../Models/Entities/RoleEntity';
import { Permission } from '../Models/Entities/PermissionEntity';
@Injectable()
export class UserService {
    constructor(
        private readonly _userDao: UserDao,
        private readonly _permissionDao: PermissionDao,
        private readonly _roleDao: RoleDao,
    ) {}

    async create(body: CreateUserRequest): Promise<User> {
        const [permissions, role]: [Permission[], Role] = await Promise.all([
            this._permissionDao.findByIds(body.permissionIds),
            this._roleDao.findById(body.roleId),
        ]);

        const user: User = new User();
        user.setEmail(body.email);
        user.setName(body.name || '');
        user.setLastName(body.lastName || '');
        user.setPassword(await PasswordUtils.getEncryptData(body.password || process.env.PASSWORD_USER_DEFAULT));
        user.setVerificationCode((await UtilsFunctions.generateNumber()).toString());
        user.setExpireVerificationCode((await UtilsFunctions.generateNumber()).toString());
        user.setIsActive(true);
        user.setPermissions(permissions);
        user.setRole(role);

        const resultUser = await this._userDao.save(user);
        return resultUser;
    }

    async updateUser(body: UpdateUserRequest) {
        const [findUser, permissions, role]: [User, Permission[], Role] = await Promise.all([
            this._userDao.findByUuid(body.uuidUser),
            this._permissionDao.findByIds(body.permissionIds),
            this._roleDao.findById(body.roleId),
        ]);

        if (body?.email) {
            findUser.setEmail(body.email);
        }

        if (body?.name) {
            findUser.setName(body.name);
        }

        if (body?.lastName) {
            findUser.setLastName(body.lastName);
        }

        if (body?.locationS3) {
            findUser.setLocationS3(body.locationS3);
        }

        if (body?.permissionIds) {
            findUser.setUserPermission(permissions);
        }

        if (body?.roleId) {
            findUser.setRoleId(role);
        }

        await this._userDao.save(findUser);
        return new SuccessfulResponse('User update successfully');
    }

    async findByEmail(body: FindByEmailRequest): Promise<FindUserResponse> {
        const findUser: User = await this._userDao.findByEmail(body.email);
        if (!findUser) {
            return null;
        }
        return new FindUserResponse(findUser);
    }
    async findByUuid(uuidUser: string) {
        const findUser: User = await this._userDao.findByUuid(uuidUser);
        if (!findUser) {
            throw new HttpCustomException('User NOT FOUND', StatusCodeEnums.USER_NOT_FOUND);
        }
        return new FindByUuidResponse(findUser);
    }

    async restorePassword(body: RestorePasswordRequest) {
        const findUser: User = await this._userDao.findByEmail(body.email);
        if (!findUser) {
            throw new HttpCustomException('USER_NOT_FOUND', StatusCodeEnums.USER_NOT_FOUND);
        }
        findUser.setPassword(await PasswordUtils.getEncryptData(body.password || process.env.PASSWORD_USER_DEFAULT));
        await this._userDao.save(findUser);
        return new SuccessfulResponse('User update successfully');
    }

    async updatePassword(body: UpdatePasswordRequest) {
        const findUser: User = await this._userDao.findByEmail(body.email);
        if (!findUser) {
            throw new HttpCustomException('USER_NOT_FOUND', StatusCodeEnums.USER_NOT_FOUND);
        }
        const result = await PasswordUtils.getEncryptData(body.password || process.env.PASSWORD_USER_DEFAULT);
        findUser.setPassword(result);
        await this._userDao.save(findUser);
        return new SuccessfulResponse('User update successfully');
    }

    async activeUser(body: ActiveUserRequest) {
        const findUser: User = await this._userDao.findByUuid(body.uuidUser);
        if (!findUser) {
            throw new HttpCustomException('USER_NOT_FOUND', StatusCodeEnums.USER_NOT_FOUND);
        }
        findUser.setIsActive(body.isActive);
        await this._userDao.save(findUser);
        return new SuccessfulResponse('User update successfully');
    }
}
