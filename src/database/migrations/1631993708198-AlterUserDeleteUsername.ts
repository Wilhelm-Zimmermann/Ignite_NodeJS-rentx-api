import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class AlterUserDeleteUsername1631993708198 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "username");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("user",
            new TableColumn({
                name: "username",
                type: "varchar"
            }));
    }

}
