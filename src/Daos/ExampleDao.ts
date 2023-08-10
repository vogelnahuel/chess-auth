import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhoneAcronym } from '../Models/Entities/Phone/PhoneAcronymEntity';
import { IFindAllPhoneAcronym } from '../Interfaces/PhoneAcronymInterface';

@Injectable()
export class AcronymDao {
    constructor(@InjectRepository(PhoneAcronym) private readonly _acronymRepository: Repository<PhoneAcronym>) {}

    async findAcronymId(id: number): Promise<PhoneAcronym> {
        const query: PhoneAcronym = await this._acronymRepository
            .createQueryBuilder('phone_acronym')
            .where('phone_acronym.id = :id', { id: id })
            .getOne();
        return query;
    }

    async findByAcronymByCountry(acronymNumber: string): Promise<PhoneAcronym> {
        const query: PhoneAcronym = await this._acronymRepository
            .createQueryBuilder('phone_acronym')
            .innerJoin('phone_acronym.countryId', 'country')
            .where('country.acronym = :acronymNumber', { acronymNumber })
            .getOne();
        return query;
    }

    async findAllAcronyms(): Promise<IFindAllPhoneAcronym[]> {
        const query: IFindAllPhoneAcronym[] = await this._acronymRepository
            .createQueryBuilder('phone_acronym')
            .select('phone_acronym.acronymNumber', 'acronymNumber')
            .addSelect('c.name', 'countryName')
            .addSelect('c.acronym', 'countryAcronym')
            .innerJoin('phone_acronym.countryId', 'c')
            .getRawMany();

        return query;
    }
}
