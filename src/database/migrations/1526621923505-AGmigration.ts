import {MigrationInterface, QueryRunner} from "typeorm";

export class aGmigration1526621923505 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `user` (`id` varchar(255) NOT NULL, `first_name` varchar(255) NOT NULL, `last_name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `pet` (`id` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `age` int NOT NULL, `user_id` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `restaurant_area` (`id` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `restaurant_event` (`id` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `restaurantId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `restaurant` (`id` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `category` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `restaurant_areas_restaurant_area` (`restaurantId` varchar(255) NOT NULL, `restaurantAreaId` varchar(255) NOT NULL, PRIMARY KEY (`restaurantId`, `restaurantAreaId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `pet` ADD CONSTRAINT `FK_64704296b7bd17e90ca0a620a98` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)");
        await queryRunner.query("ALTER TABLE `restaurant_event` ADD CONSTRAINT `FK_e19697f17d7c5a08e6f20e76a14` FOREIGN KEY (`restaurantId`) REFERENCES `restaurant`(`id`)");
        await queryRunner.query("ALTER TABLE `restaurant_areas_restaurant_area` ADD CONSTRAINT `FK_642977a51940e2d1a5a23e61116` FOREIGN KEY (`restaurantId`) REFERENCES `restaurant`(`id`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `restaurant_areas_restaurant_area` ADD CONSTRAINT `FK_1524abd76071473d84dc48f4bc9` FOREIGN KEY (`restaurantAreaId`) REFERENCES `restaurant_area`(`id`) ON DELETE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `restaurant_areas_restaurant_area` DROP FOREIGN KEY `FK_1524abd76071473d84dc48f4bc9`");
        await queryRunner.query("ALTER TABLE `restaurant_areas_restaurant_area` DROP FOREIGN KEY `FK_642977a51940e2d1a5a23e61116`");
        await queryRunner.query("ALTER TABLE `restaurant_event` DROP FOREIGN KEY `FK_e19697f17d7c5a08e6f20e76a14`");
        await queryRunner.query("ALTER TABLE `pet` DROP FOREIGN KEY `FK_64704296b7bd17e90ca0a620a98`");
        await queryRunner.query("DROP TABLE `restaurant_areas_restaurant_area`");
        await queryRunner.query("DROP TABLE `restaurant`");
        await queryRunner.query("DROP TABLE `restaurant_event`");
        await queryRunner.query("DROP TABLE `restaurant_area`");
        await queryRunner.query("DROP TABLE `pet`");
        await queryRunner.query("DROP TABLE `user`");
    }

}
