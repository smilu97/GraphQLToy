import { EntityRepository, Repository } from 'typeorm';
import { RestaurantArea } from '../models/RestaurantArea';

@EntityRepository(RestaurantArea)
export class RestaurantAreaRepository extends Repository<RestaurantArea> {
    public async findByRestaurantIds(id: string): Promise<RestaurantArea[]> {
        return await this.find({
            where: {
                restaurantId: id,
            },
        });
    }
}
