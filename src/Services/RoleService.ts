import { Injectable } from '@nestjs/common';
import { RoleDao } from '../Daos/RoleDao';
import { StatusCodeEnums } from '../Enums/StatusCodeEnums';
import HttpCustomException from '../Exceptions/HttpCustomException';
import { Role } from '../Models/Entities/RoleEntity';
import { FindRoleResponse } from 'src/Models/Response/Role/FindRoleResponse';

@Injectable()
export class RoleService {
    constructor(private readonly _roleDao: RoleDao) {}

    async create(body: any) {
        const role = new Role();
        role.setName(body.name);
        const newRole = await this._roleDao.save(role);

        return newRole;
    }

    async findById(id: number): Promise<FindRoleResponse> {
        const role = await this._roleDao.findById(id);
        if (!role) return null;

        return new FindRoleResponse(role);
    }

    async findRoleByName(body: any): Promise<FindRoleResponse> {
        const findAction: Role = await this._roleDao.findByName(body.name);
        if (!findAction) {
            throw new HttpCustomException('ROLE_NOT_FOUND', StatusCodeEnums.ROLE_NOT_FOUND);
        }
        return new FindRoleResponse(findAction);
    }
}
