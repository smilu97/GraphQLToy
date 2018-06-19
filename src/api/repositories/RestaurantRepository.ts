import { EntityRepository, Repository } from 'typeorm';
import { Restaurant } from '../models/Restaurant';

@EntityRepository(Restaurant)
export class RestaurantRepository extends Repository<Restaurant> {
    public async findWithAreaId(id: string): Promise<Restaurant[]> {
        const query = this.createQueryBuilder('R')
            .select()
            .leftJoin('restaurant_areas_restaurant_area', 'RA', 'R.id = RA.restaurantId')
            .leftJoin('restaurant_area', 'A', 'A.id = RA.restaurantAreaId')
            .where(`A.id = :id`, { id });

        console.log(query.getQuery());

        return await query.getMany();
    }
}
