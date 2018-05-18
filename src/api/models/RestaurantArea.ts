import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Restaurant } from './Restaurant';

@Entity()
export class RestaurantArea {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @IsNotEmpty()
    @Column()
    public name: string;

    @ManyToMany(type => Restaurant, restaurant => restaurant.areas)
    public restaurants: Restaurant[];

    public toString(): string {
        return `${this.name}`;
    }
}
