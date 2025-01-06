import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../Models/Entities/UserEntity';
import { Repository } from 'typeorm';

@Injectable()
export class UserDao {
    constructor(@InjectRepository(User) private readonly _userRepository: Repository<User>) {}

    async save(user: User): Promise<User> {
        return this._userRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        const query = this._userRepository.createQueryBuilder('user').getMany();
        if (!query) {
            return null;
        }
        return query;
    }

    async findByEmail(email: string): Promise<User> {
        const query = this._userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.role', 'role')
            .where('user.email = :email', { email: email })
            .getOne();
        if (!query) {
            return null;
        }
        return query;
    }
    async findUserPermissionByName(email: string): Promise<string[]> {
        const query = await this._userRepository
            .createQueryBuilder('user')
            .innerJoin('user_permission', 'up', 'up."user_id" = user.id')
            .innerJoin('permission', 'p', 'p.id = up."permission_id"')
            .select('p.name')

            .where('user.email = :email', { email })
            .getRawMany();
        return query.map((item) => item.p_name);
    }

    async findByUuid(uuid: string): Promise<User> {
        const query = this._userRepository
            .createQueryBuilder('user')
            .innerJoinAndSelect('user.userPermission', 'Permission')
            .where('user.uuid = :uuid', { uuid: uuid })
            .getOne();
        if (!query) {
            return null;
        }
        return query;
    }

    async findById(id: number) {
        const query = this._userRepository
            .createQueryBuilder('user')
            .innerJoinAndSelect('user.userPermission', 'Permission')
            .where('user.id = :id', { id: id })
            .getOne();
        if (!query) {
            return null;
        }
        return query;
    }

    async findAllIds(id: number[]) {
        const query = this._userRepository
            .createQueryBuilder('user')
            .innerJoinAndSelect('user.userPermission', 'Permission')
            .where('user.id IN (:...id)', { id: id })
            .getMany();
        if (!query) {
            return null;
        }
        return query;
    }

    async findUsersByPermission(id: number) {
        const query = this._userRepository
            .createQueryBuilder('user')
            .innerJoin('user.userPermission', 'Permission')
            .where('Permission.id = :id', { id: id })
            .getMany();
        if (!query) {
            return null;
        }
        return query;
    }

    async updateLastActivity(uuidUser: string, userToUpdate: User) {
        await this._userRepository.createQueryBuilder().update().set(userToUpdate).where('uuid = :uuidUser', { uuidUser: uuidUser }).execute();
    }
}
