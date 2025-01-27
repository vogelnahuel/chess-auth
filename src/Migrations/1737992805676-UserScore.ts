import { MigrationInterface, QueryRunner } from "typeorm";

export class UserScore1737992805676 implements MigrationInterface {
    name = 'UserScore1737992805676'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "score_blitz" integer NOT NULL DEFAULT '1400'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "score_rapid" integer NOT NULL DEFAULT '1400'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "score_bullet" integer NOT NULL DEFAULT '1400'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "last_activity_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "last_activity_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "score_bullet"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "score_rapid"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "score_blitz"`);
    }

}
