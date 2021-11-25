import {MigrationInterface, QueryRunner} from "typeorm";

export class AddBenefits1637801061140 implements MigrationInterface {
    name = 'AddBenefits1637801061140'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "benefits" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "ownerId" uuid, CONSTRAINT "PK_f83fd5765028f20487943258b46" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "benefits" ADD CONSTRAINT "FK_c2b5c3067f210073d13b0d3a8ad" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "benefits" DROP CONSTRAINT "FK_c2b5c3067f210073d13b0d3a8ad"`);
        await queryRunner.query(`DROP TABLE "benefits"`);
    }

}
