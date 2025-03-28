import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDb1743154864859 implements MigrationInterface {
    name = 'InitDb1743154864859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`file_name\` \`file_name\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`file_name\` \`file_name\` varchar(255) NOT NULL`);
    }

}
