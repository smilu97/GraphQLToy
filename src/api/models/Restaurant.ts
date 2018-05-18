import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, JoinColumn } from 'typeorm';
import { RestaurantArea } from './RestaurantArea';
import { RestaurantEvent } from './RestaurantEvent';

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

    public toString(): string {
        return `${this.name}`;
    }

}
