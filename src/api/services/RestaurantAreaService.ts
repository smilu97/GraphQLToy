import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { RestaurantAreaRepository } from '../repositories/RestaurantAreaRepository';
import { RestaurantArea } from '../models/RestaurantArea';

@Service()
export class RestaurantAreaService {

    constructor(
        @OrmRepository() private restaurantAreaRepository: RestaurantAreaRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public async find(where: any = {}): Promise<RestaurantArea[]> {
        this.log.info('Find all restaurantAreas');
        return await this.restaurantAreaRepository.find({ where });
    }

    public findOne(id: string): Promise<RestaurantArea | undefined> {
        this.log.info('Find a restaurantArea');
        return this.restaurantAreaRepository.findOne({ id });
    }

    public async create(area: RestaurantArea): Promise<RestaurantArea> {
        this.log.info('Create a new restaurantArea => ', area.toString());
        const newArea = await this.restaurantAreaRepository.save(area);
        return newArea;
    }

    public async update(id: string, area: RestaurantArea): Promise<RestaurantArea> {
        this.log.info('Update a restaurantArea');
        area.id = id;
        return await this.restaurantAreaRepository.save(area);
    }

    public async delete(id: string): Promise<void> {
        this.log.info('Delete a restaurantArea');
        await this.restaurantAreaRepository.delete(id);
        return;
    }

}
