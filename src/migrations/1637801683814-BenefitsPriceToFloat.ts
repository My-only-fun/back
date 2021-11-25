import {MigrationInterface, QueryRunner} from "typeorm";

export class BenefitsPriceToFloat1637801683814 implements MigrationInterface {
    name = 'BenefitsPriceToFloat1637801683814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "benefits" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "benefits" ADD "price" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "benefits" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "benefits" ADD "price" integer NOT NULL`);
    }

}
