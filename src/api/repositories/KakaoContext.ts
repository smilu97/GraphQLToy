import { EntityRepository, Repository } from 'typeorm';
import { KakaoContext } from '../models/KakaoContext';

@EntityRepository(KakaoContext)
export class KakaoContextRepository extends Repository<KakaoContext> {

}
