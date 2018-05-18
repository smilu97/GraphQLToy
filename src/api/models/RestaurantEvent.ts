import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Restaurant } from './Restaurant';

@Entity()
export class RestaurantEvent {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @IsNotEmpty()
    @Column()
    public name: string;

    @ManyToOne(type => Restaurant, restaurant => restaurant.events)
    @JoinColumn()
    public restaurant: Restaurant;

    public toString(): string {
        return `${this.name}`;
    }

}
