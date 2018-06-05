import {
    Get, JsonController
} from 'routing-controllers';
import { Restaurant } from '../models/Restaurant';
import { RestaurantService } from '../services/RestaurantService';

@JsonController('/restaurants')
export class RestaurantController {

    constructor(
        private restaurantService: RestaurantService
    ) { }

    @Get()
    public find(): Promise<Restaurant[]> {
        return this.restaurantService.find();
    }
}
