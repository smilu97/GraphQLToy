import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Restaurant } from '../models/Restaurant';
import { RestaurantRepository } from '../repositories/RestaurantRepository';

@Service()
export class RestaurantService {

    constructor(
        @OrmRepository() private restaurantRepository: RestaurantRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(): Promise<Restaurant[]> {
        this.log.info('Find all restaurants');
        return this.restaurantRepository.find();
    }

    public findByName(name: string): Promise<Restaurant[]> {
        this.log.info('Find all restaurants that name is', name);
        return this.restaurantRepository.find({
            where: {
                name,
            },
        });
    }

    public findOne(id: string): Promise<Restaurant | undefined> {
        this.log.info('Find a restaurant');
        return this.restaurantRepository.findOne({ id });
    }

    public async create(restaurant: Restaurant): Promise<Restaurant> {
        this.log.info('Create a new restaurant => ', restaurant.toString());
        const newRestaurant = await this.restaurantRepository.save(restaurant);
        // this.eventDispatcher.dispatch(events.restaurant.created, newRestaurant);
        return newRestaurant;
    }

    public update(id: string, restaurant: Restaurant): Promise<Restaurant> {
        this.log.info('Update a restaurant');
        restaurant.id = id;
        return this.restaurantRepository.save(restaurant);
    }

    public async delete(id: string): Promise<void> {
        this.log.info('Delete a restaurant');
        await this.restaurantRepository.delete(id);
        return;
    }

}
