
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { KAKAO } from '../constants/KakaoConstants';

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

    @Column({ default: KAKAO.status.NOT_STARTED })
    public status: string;

    public toString(): string {
        return `${this.id}`;
    }
}
