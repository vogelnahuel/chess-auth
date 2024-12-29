import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from '../Models/Entities/PermissionEntity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionDao {
    constructor(@InjectRepository(Permission) private readonly _permissionRepository: Repository<Permission>) {}

    async findAll(): Promise<Permission[]> {
        const query = this._permissionRepository.createQueryBuilder('Permission').getMany();
        if (!query) {
            return null;
        }
        return query;
    }

    async saveMultiple(dynamicSeries: Permission[]) {
        const dynamicItems = await this._permissionRepository.save(dynamicSeries);
        return dynamicItems;
    }

    async findById(id: number) {
        const query = this._permissionRepository.createQueryBuilder('Permission').where('Permission.id = :id', { id: id }).getOne();
        if (!query) {
            return null;
        }
        return query;
    }

    async findByIds(id: number[]) {
        const query = this._permissionRepository.createQueryBuilder('Permission').where('Permission.id IN (:...ids)', { ids: id }).getMany();
        if (!query) {
            return null;
        }
        return query;
    }
}
