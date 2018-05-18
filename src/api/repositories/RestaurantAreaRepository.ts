import { EntityRepository, Repository } from 'typeorm';
import { RestaurantArea } from '../models/RestaurantArea';

@EntityRepository(RestaurantArea)
export class RestaurantAreaRepository extends Repository<RestaurantArea> {

}
