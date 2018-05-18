
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class KakaoContext {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public restaurantName: string;

    @Column()
    public category: string;

    @Column()
    public area: string;

    @Column({ default: 0 })
    public receivingButton: number;

    public toString(): string {
        return `${this.id}`;
    }
}
