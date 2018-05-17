import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { RestaurantArea } from './RestaurantArea';

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

    public toString(): string {
        return `${this.name}`;
    }

}
