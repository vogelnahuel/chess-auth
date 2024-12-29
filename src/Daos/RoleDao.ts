import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../Models/Entities/RoleEntity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleDao {
    constructor(@InjectRepository(Role) private readonly _roleRepository: Repository<Role>) {}

    async save(role: Role): Promise<Role> {
        return this._roleRepository.save(role);
    }

    async findAll(): Promise<Role[]> {
        const query = this._roleRepository.createQueryBuilder('Role').getMany();
        if (!query) {
            return null;
        }
        return query;
    }

    async findByName(name: string): Promise<Role> {
        const query = this._roleRepository.createQueryBuilder('Role').where('Role.name = :name', { name: name }).getOne();
        if (!query) {
            return null;
        }
        return query;
    }

    async findById(id: number): Promise<Role> {
        const query = this._roleRepository.createQueryBuilder('Role').where('Role.id = :id', { id: id }).getOne();
        if (!query) return null;

        return query;
    }
}
