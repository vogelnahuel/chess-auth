import { Injectable } from '@nestjs/common';
import { PermissionDao } from '../Daos/PermissionDao';
import { Permission } from '../Models/Entities/PermissionEntity';
import FindPermissionByIdsResponse from '../Models/Response/Permission/FindPermissionByIdsResponse';

@Injectable()
export class PermissionService {
    constructor(private readonly _permissionDao: PermissionDao) {}

    async create(filters: any) {
        const permissions = filters.names.map((item: any) => {
            const permission = new Permission();
            permission.setName(item);
            return permission;
        });

        const newPermissions = await this._permissionDao.saveMultiple(permissions);

        return newPermissions;
    }

    async findByIds(filters: any): Promise<FindPermissionByIdsResponse[]> {
        const findPermissions: Permission[] = await this._permissionDao.findByIds(filters.permissionIds);
        let response: FindPermissionByIdsResponse[] = [];
        response = findPermissions.map((findPermission) => {
            return new FindPermissionByIdsResponse(findPermission);
        });
        return response;
    }
}
