import {
    Get, JsonController
} from 'routing-controllers';
import { Restaurant } from '../models/Restaurant';
import { RestaurantService } from '../services/RestaurantService';
import { RestaurantEvent } from '../models/RestaurantEvent';
import { RestaurantEventService } from '../services/RestaurantEventService';

@JsonController('/restaurants')
export class RestaurantController {

    constructor(
        private restaurantService: RestaurantService,
        private restaurantEventService: RestaurantEventService
    ) { }

    @Get()
    public find(): Promise<Restaurant[]> {
        return this.restaurantService.find();
    }

    @Get('/events')
    public findEvents(): Promise<RestaurantEvent[]> {
        return this.restaurantEventService.find();
    }
}
