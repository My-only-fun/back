import {MigrationInterface, QueryRunner} from "typeorm";

export class AddHighlightOnBenefit1638407058362 implements MigrationInterface {
    name = 'AddHighlightOnBenefit1638407058362'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "benefits" ADD "highlight" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "benefits" DROP COLUMN "highlight"`);
    }

}
