import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigrations1712526058532 implements MigrationInterface {
    name = 'NewMigrations1712526058532'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`profile\` (\`id\` varchar(36) NOT NULL, \`fullnames\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phoneNo\` int NOT NULL, \`authId\` varchar(255) NULL, UNIQUE INDEX \`REL_9e51479f7c74c1c61637515b04\` (\`authId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`auth\` (\`id\` varchar(36) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('user', 'admin') NOT NULL DEFAULT 'user', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD CONSTRAINT \`FK_9e51479f7c74c1c61637515b04e\` FOREIGN KEY (\`authId\`) REFERENCES \`auth\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`profile\` DROP FOREIGN KEY \`FK_9e51479f7c74c1c61637515b04e\``);
        await queryRunner.query(`DROP TABLE \`auth\``);
        await queryRunner.query(`DROP INDEX \`REL_9e51479f7c74c1c61637515b04\` ON \`profile\``);
        await queryRunner.query(`DROP TABLE \`profile\``);
    }

}
