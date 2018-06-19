import {
    Get, JsonController, Body, Post, Authorized, CurrentUser, Param
} from 'routing-controllers';
import { Restaurant } from '../models/Restaurant';
import { RestaurantService } from '../services/RestaurantService';
import { RestaurantEvent } from '../models/RestaurantEvent';
import { RestaurantEventService } from '../services/RestaurantEventService';
import { User } from '../models/User';

@JsonController('/restaurants')
export class RestaurantController {

    constructor(
        private restaurantService: RestaurantService,
        private restaurantEventService: RestaurantEventService
    ) { }

    @Get()
    public async find(): Promise<{
        success: boolean,
        restaurants?: Restaurant[],
        error?: string,
    }> {
        try {
            const restaurants = await this.restaurantService.find();
            return {
                success: true,
                restaurants,
            };
        } catch (e) {
            return {
                success: false,
                error: 'Error occured while getting restaurants',
            };
        }
    }

    @Get('/events')
    public async findEvents(): Promise<{
        success: boolean,
        events?: RestaurantEvent[],
        error?: string,
    }> {
        try {
            const events = await this.restaurantEventService.find();
            return {
                success: true,
                events,
            };
        } catch (e) {
            return {
                success: false,
                error: 'Error occured while getting events',
            };
        }
    }

    @Get('/:id/events')
    public async findEventsOfRestaurant( @Param('id') id: string ): Promise<{
        success: boolean,
        events?: RestaurantEvent[],
        error?: string,
    }> {
        try {
            const events = await this.restaurantEventService.findOfRestaurants(id);
            return {
                success: true,
                events,
            };
        } catch (e) {
            return {
                success: false,
                error: 'Error occured while getting events',
            };
        }
    }

    @Authorized()
    @Post('/event')
    public async createEvent( @CurrentUser() user: User, @Body() body: any ): Promise<{
        success: boolean,
        event?: RestaurantEvent,
        error?: string,
    }> {
        try {
            body.publisherId = user.id;
            const resEvent = await this.restaurantEventService.create(body);
            if (resEvent) {
                return {
                    success: true,
                    event: resEvent,
                };
            }
            return {
                success: false,
                error: 'Failed to create event',
            };
        } catch (e) {
            return {
                success: false,
                error: 'Failed to create event',
            };
        }
    }

    @Get('/detail/:id')
    public async findById( @Param('id') id: string ): Promise<{
        success: boolean,
        restaurant?: Restaurant,
        error?: string,
    }> {
        try {
            const restaurant = await this.restaurantService.findOne(id);
            if (restaurant) {
                return {
                    success: true,
                    restaurant,
                };
            } else {
                return {
                    success: false,
                    error: `Restaurant id ${id} not found`,
                };
            }
        } catch (e) {
            return {
                success: false,
                error: 'Failed to find a restaurant',
            };
        }
    }

    @Authorized()
    @Post()
    public async createRestaurant( @CurrentUser() user: User, @Body() body: Restaurant ): Promise<{
        success: boolean,
        error?: string,
        restaurant?: Restaurant,
    }> {
        try {
            body.owner = user;
            const restaurant = await this.restaurantService.create(body);
            return {
                success: true,
                restaurant,
            };
        } catch (e) {
            return {
                success: false,
                error: 'Error occured while creating restaurant',
            };
        }
    }
}
