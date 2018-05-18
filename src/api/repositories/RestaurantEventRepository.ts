import { EntityRepository, Repository } from 'typeorm';
import { RestaurantEvent } from '../models/RestaurantEvent';

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
        let firstWhere = 1;
        let query = this.createQueryBuilder('E')
            .select()
            .leftJoin('restaurant', 'R', 'E.restaurantId = R.id')
            .leftJoin('restaurant_areas_restaurant_area', 'RA', 'R.id = RA.restaurantId')
            .leftJoin('restaurant_area', 'A', 'A.id = RA.restaurantAreaId')
            .where(`R.name = ?`);

        if (name) {
            query = query.where('R.name = :name', { name });
            firstWhere = 0;
        }
        if (category) {
            if (firstWhere) {
                query = query.where('R.category = :category', { category });
                firstWhere = 0;
            } else {
                query = query.andWhere('R.category = :category', { category });
            }
        }
        if (area) {
            if (firstWhere) {
                query = query.where('A.name = :area', { area });
                firstWhere = 0;
            } else {
                query = query.andWhere('A.name = :area', { area });
            }
        }

        console.log(query.getQuery());

        return await query.getMany();
    }
}
