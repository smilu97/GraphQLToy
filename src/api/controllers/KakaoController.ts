import {
    Body, Get, JsonController, Post, Delete, Param
} from 'routing-controllers';

import { KakaoPostMessageRequest } from './requests/KakaoRequests';
import { KakaoPostMessageResponse } from './responses/KakaoResponses';
import { RestaurantEventService } from '../services/RestaurantEventService';
import { RestaurantEvent } from '../models/RestaurantEvent';

@JsonController('/kakaochat')
export class KakaoController {

    constructor(
        private restaurantEventService: RestaurantEventService
    ) {}

    @Post('/test')
    public kakaoTest(@Body() body: {
        name: string,
        category: string,
        area: string,
    }): Promise<RestaurantEvent[]> {
        return this.restaurantEventService.findByNameOrCategoryOrArea(body.name, body.category, body.area);
    }

    @Get('/keyboard')
    public getKeyboard(): any {
        return {
            type: 'buttons',
            buttons: ['FindRestaurant'],
        };
    }

    @Post('/message')
    public handleMessage(@Body() body: KakaoPostMessageRequest): KakaoPostMessageResponse {
        const res = new KakaoPostMessageResponse('Testing');
        return res;
    }

    @Post('/friend')
    public handleNewFriend(@Body() body: any): void {
        return;
    }

    @Delete('/friend/:userKey')
    public handleLoseFriend(@Param('userKey') userKey: number): void {
        return;
    }

    @Delete('/chat_room/:userKey')
    public handleLeaveRoom(@Param('userKey') userKey: number): void {
        return;
    }
}
