
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { KAKAO } from '../constants/KakaoConstants';

@Entity()
export class KakaoContext {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ nullable: true })
    public restaurantName: string;

    @Column({ nullable: true })
    public category: string;

    @Column({ nullable: true })
    public area: string;

    @Column({ default: KAKAO.status.NOT_STARTED })
    public status: string;

    public toString(): string {
        return `${this.id}`;
    }
}
