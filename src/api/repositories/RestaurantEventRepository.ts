import { EntityRepository, Repository } from 'typeorm';
import { RestaurantEvent } from '../models/RestaurantEvent';
import { Restaurant } from '../models/Restaurant';
import { RestaurantArea } from '../models/RestaurantArea';

@EntityRepository(RestaurantEvent)
export class RestaurantEventRepository extends Repository<RestaurantEvent> {

    /*
    Expected query
    select E.* from restaurant_event E
        left join restaurant R on R.id = E.restaurantId
        left join restaurant_areas_restaurant_area RA on R.id = RA.restaurantId
        left join restaurant_area A on A.id = RA.restaurantAreaId
        where R.name = 'asdf' and R.category = 'qwer' and A.name = 'zxcv';
    */
    public async findByNameOrCategoryOrArea(name: string, category: string, area: string): Promise<RestaurantEvent[]> {
        let conditions = {};
        if (name) {
            conditions = { ...conditions, ...{ 'restaurant.name': name } };
        }
        if (category) {
            conditions = { ...conditions, ...{ 'restaurant.category': category } };
        }
        if (area) {
            conditions = { ...conditions, ...{ 'event.name': area } };
        }
        const restaurants = await this.createQueryBuilder('event')
            .select()
            .leftJoin(Restaurant, 'restaurant')
            .leftJoin(RestaurantArea, 'area')
            .where(conditions)
            .getMany();
        return restaurants;
    }
}
