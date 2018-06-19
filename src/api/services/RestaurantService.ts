import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Restaurant } from '../models/Restaurant';
import { RestaurantRepository } from '../repositories/RestaurantRepository';
import { RestaurantAreaRepository } from '../repositories/RestaurantAreaRepository';
import { RestaurantArea } from '../models/RestaurantArea';

@Service()
export class RestaurantService {

    constructor(
        @OrmRepository() private restaurantRepository: RestaurantRepository,
        @OrmRepository() private restaurantAreaRepository: RestaurantAreaRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(where: any = {}): Promise<Restaurant[]> {
        this.log.info('Find all restaurants');
        return this.restaurantRepository.find({
            where,
        });
    }

    public async findWithAreaId(id: string): Promise<Restaurant[]> {
        this.log.info(`Find all restaurants of area ${id}`);
        return await this.restaurantRepository.findWithAreaId(id);
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
        return this.restaurantRepository.findOne(id);
    }

    public async create(restaurant: Restaurant): Promise<Restaurant> {
        this.log.info('Create a new restaurant => ', restaurant.toString());
        const newRestaurant = await this.restaurantRepository.save(restaurant);
        // this.eventDispatcher.dispatch(events.restaurant.created, newRestaurant);
        if (restaurant.areas) {
            const realAreas: RestaurantArea[] = [];
            for (const area of restaurant.areas) {
                this.log.info('Create area', area);
                let newArea = await this.restaurantAreaRepository.findOne({
                    name: area.name,
                });
                if (!newArea) {
                    newArea = await this.restaurantAreaRepository.save(area);
                }
                realAreas.push(newArea);
                console.log('newArea', newArea);
            }
            newRestaurant.areas = realAreas;
            await this.restaurantRepository.save(newRestaurant);
        }
        return await this.restaurantRepository.findOne({
            where: {
                id: newRestaurant.id,
            },
            relations: ['owner', 'areas'],
        });
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
