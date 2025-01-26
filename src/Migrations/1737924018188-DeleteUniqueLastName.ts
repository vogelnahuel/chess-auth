import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteUniqueLastName1737924018188 implements MigrationInterface {
    name = 'DeleteUniqueLastName1737924018188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_f0e1b4ecdca13b177e2e3a0613c"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_f0e1b4ecdca13b177e2e3a0613c" UNIQUE ("lastName")`);
    }

}
