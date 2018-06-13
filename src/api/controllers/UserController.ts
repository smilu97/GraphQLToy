import {
    Authorized, Body, CurrentUser, Delete, JsonController, Put, Get
} from 'routing-controllers';

// import { UserNotFoundError } from '../errors/UserNotFoundError';
import { User } from '../models/User';
import { UserService } from '../services/UserService';
import { Restaurant } from '../models/Restaurant';

@JsonController('/users')
export class UserController {

    constructor(
        private userService: UserService
    ) { }

    @Authorized()
    @Put()
    public async update( @CurrentUser() user: User, @Body() userData: User): Promise<{
        success: boolean,
    }> {
        try {
            await this.userService.update(user.id, user);
            return { success: true };
        } catch (e) {
            return { success: false };
        }
    }

    @Authorized()
    @Delete()
    public async delete( @CurrentUser() user: User): Promise<{
        success: boolean,
    }> {
        try {
            await this.userService.delete(user.id);
            return { success: true };
        } catch (e) {
            return { success: false };
        }
    }

    @Authorized()
    @Get('/restaurants')
    public async getRestaurants( @CurrentUser() user: User ): Promise<{
        success: boolean,
        restaurants?: Restaurant[],
        error?: string,
    }> {
        try {
            const restaurants = await this.userService.findRestaurants(user);
            return {
                success: true,
                restaurants,
            };
        } catch (e) {
            return {
                success: false,
                error: 'Failed to get restaurants of user',
            };
        }
    }

}
