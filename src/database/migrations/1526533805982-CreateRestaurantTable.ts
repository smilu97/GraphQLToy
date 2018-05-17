import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateRestaurantTable1526533805982 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'restaurant',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    length: '255',
                    isPrimary: true,
                    isNullable: false,
                },
            ],
        });
        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('restaurant');
    }

}
