import { EntityRepository, Repository } from 'typeorm';
import { Restaurant } from '../models/Restaurant';

@EntityRepository(Restaurant)
export class RestaurantRepository extends Repository<Restaurant> {

}
