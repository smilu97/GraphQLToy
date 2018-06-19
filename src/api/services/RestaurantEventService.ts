import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { RestaurantEventRepository } from '../repositories/RestaurantEventRepository';
import { RestaurantEvent } from '../models/RestaurantEvent';

@Service()
export class RestaurantEventService {

    constructor(
        @OrmRepository() private restaurantEventRepository: RestaurantEventRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public async find(where: any = {}): Promise<RestaurantEvent[]> {
        this.log.info('Find all restaurantEvents');
        return await this.restaurantEventRepository.find({ where });
    }

    public async findByRestaurantIds(restaurantId: string): Promise<RestaurantEvent[]> {
        this.log.info('Find all restaurantEvents');
        return await this.restaurantEventRepository.find({
            where: {
                restaurantId,
            },
        });
    }

    public async findByName(name: string): Promise<RestaurantEvent[]> {
        this.log.info('Find all restaurantEvents that name is', name);
        return await this.restaurantEventRepository.find({
            where: {
                name,
            },
        });
    }

    public findOne(id: string): Promise<RestaurantEvent | undefined> {
        this.log.info('Find a restaurantEvent');
        return this.restaurantEventRepository.findOne({ id });
    }

    public async create(event: RestaurantEvent): Promise<RestaurantEvent> {
        this.log.info('Create a new restaurantEvent => ', event.toString());
        const newEvent = await this.restaurantEventRepository.save(event);
        return newEvent;
    }

    public async update(id: string, event: RestaurantEvent): Promise<RestaurantEvent> {
        this.log.info('Update a restaurantEvent');
        event.id = id;
        return await this.restaurantEventRepository.save(event);
    }

    public async delete(id: string): Promise<void> {
        this.log.info('Delete a restaurantEvent');
        await this.restaurantEventRepository.delete(id);
        return;
    }

    public async findByNameOrCategoryOrArea(name: string, category: string, area: string): Promise<RestaurantEvent[]> {
        return this.restaurantEventRepository.findByNameOrCategoryOrArea(name, category, area);
    }

}
