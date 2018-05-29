import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

    public toString(): string {
        return `${this.name} (${this.role})`;
    }

}
