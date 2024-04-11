import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigrations1712856377605 implements MigrationInterface {
    name = 'NewMigrations1712856377605'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`comment\` (\`id\` varchar(36) NOT NULL, \`comment\` varchar(255) NOT NULL, \`postPostId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`like\` (\`id\` varchar(36) NOT NULL, \`likes\` int NOT NULL, \`userId\` varchar(36) NULL, \`postPostId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`post\` (\`postId\` varchar(36) NOT NULL, \`author\` varchar(255) NOT NULL, \`header\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, \`authId\` varchar(36) NULL, PRIMARY KEY (\`postId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`auth\` (\`id\` varchar(36) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('user', 'admin') NOT NULL DEFAULT 'user', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`profile\` (\`id\` varchar(36) NOT NULL, \`fullnames\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phoneNo\` bigint NOT NULL, \`authId\` varchar(255) NULL, UNIQUE INDEX \`REL_9e51479f7c74c1c61637515b04\` (\`authId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_58c08bd38052e10706d3b4ae89a\` FOREIGN KEY (\`postPostId\`) REFERENCES \`post\`(\`postId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`like\` ADD CONSTRAINT \`FK_e8fb739f08d47955a39850fac23\` FOREIGN KEY (\`userId\`) REFERENCES \`auth\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`like\` ADD CONSTRAINT \`FK_fb78c1e15b761aa3d470d9699ef\` FOREIGN KEY (\`postPostId\`) REFERENCES \`post\`(\`postId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_8e42f7163d360e51d93df97b613\` FOREIGN KEY (\`authId\`) REFERENCES \`auth\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD CONSTRAINT \`FK_9e51479f7c74c1c61637515b04e\` FOREIGN KEY (\`authId\`) REFERENCES \`auth\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`profile\` DROP FOREIGN KEY \`FK_9e51479f7c74c1c61637515b04e\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_8e42f7163d360e51d93df97b613\``);
        await queryRunner.query(`ALTER TABLE \`like\` DROP FOREIGN KEY \`FK_fb78c1e15b761aa3d470d9699ef\``);
        await queryRunner.query(`ALTER TABLE \`like\` DROP FOREIGN KEY \`FK_e8fb739f08d47955a39850fac23\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_58c08bd38052e10706d3b4ae89a\``);
        await queryRunner.query(`DROP INDEX \`REL_9e51479f7c74c1c61637515b04\` ON \`profile\``);
        await queryRunner.query(`DROP TABLE \`profile\``);
        await queryRunner.query(`DROP TABLE \`auth\``);
        await queryRunner.query(`DROP TABLE \`post\``);
        await queryRunner.query(`DROP TABLE \`like\``);
        await queryRunner.query(`DROP TABLE \`comment\``);
    }

}
