import { MigrationInterface, QueryRunner } from 'typeorm';

export class SocialMedia1737919684053 implements MigrationInterface {
    name = 'SocialMedia1737919684053';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "isSocialMedia" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isSocialMedia"`);
    }
}
