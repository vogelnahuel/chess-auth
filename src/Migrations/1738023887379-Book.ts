import { MigrationInterface, QueryRunner } from "typeorm";

export class Book1738023887379 implements MigrationInterface {
    name = 'Book1738023887379'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "book" ("id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "description" character varying(100) NOT NULL, "image" character varying(100) NOT NULL, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "book"`);
    }

}
