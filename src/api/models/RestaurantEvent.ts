import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Restaurant } from './Restaurant';
import { User } from './User';

@Entity()
export class RestaurantEvent {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @IsNotEmpty()
    @Column()
    public name: string;

    @Column()
    public publisherId: string;

    @Column()
    public restaurantId: string;

    @ManyToOne(type => Restaurant, restaurant => restaurant.events)
    @JoinColumn({ name: 'restaurantId' })
    public restaurant: Restaurant;

    @ManyToOne(type => User, user => user.events)
    @JoinColumn({ name: 'publisherId' })
    public publisher: User;

    public toString(): string {
        return `${this.name}`;
    }

}
