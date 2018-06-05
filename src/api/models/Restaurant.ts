import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { RestaurantArea } from './RestaurantArea';
import { RestaurantEvent } from './RestaurantEvent';
import { User } from './User';

@Entity()
export class Restaurant {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @IsNotEmpty()
    @Column()
    public name: string;

    @IsNotEmpty()
    @Column()
    public category: string;

    @ManyToMany(type => RestaurantArea, area => area.restaurants)
    @JoinTable()
    public areas: RestaurantArea[];

    @OneToMany(type => RestaurantEvent, event => event.restaurant)
    public events: RestaurantEvent[];

    @ManyToOne(type => User, user => user.restaurants)
    @JoinColumn()
    @IsNotEmpty()
    public owner: User;

    public toString(): string {
        return `${this.name}`;
    }

}
