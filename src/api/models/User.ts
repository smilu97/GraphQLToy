import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Restaurant } from './Restaurant';
import { RestaurantEvent } from './RestaurantEvent';

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @IsNotEmpty()
    @Column()
    public name: string;

    @IsNotEmpty()
    @Column()
    public password: string;

    @IsNotEmpty()
    @Column()
    public role: string;

    @IsNotEmpty()
    @Column()
    public email: string;

    @OneToMany(type => Restaurant, restaurant => restaurant.owner)
    public restaurants: Restaurant[];

    @OneToMany(type => RestaurantEvent, event => event.publisher)
    public events: RestaurantEvent[];

    public toString(): string {
        return `${this.name} (${this.role})`;
    }

}
