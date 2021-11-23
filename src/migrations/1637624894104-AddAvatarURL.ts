import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAvatarURL1637624894104 implements MigrationInterface {
    name = 'AddAvatarURL1637624894104'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "avatar_url" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar_url"`);
    }

}
