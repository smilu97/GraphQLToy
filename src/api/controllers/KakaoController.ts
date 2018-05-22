import {
    Body, Get, JsonController, Post, Delete, Param
} from 'routing-controllers';

import { KakaoPostMessageRequest, KakaoPostFriendRequest } from './requests/KakaoRequests';
import { KakaoPostMessageResponse } from './responses/KakaoResponses';
import { RestaurantEventService } from '../services/RestaurantEventService';
import { RestaurantEvent } from '../models/RestaurantEvent';
import { KakaoContextService } from '../services/KakaoContextService';
import { KakaoContext } from '../models/KakaoContext';
import { KAKAO } from '../constants/KakaoConstants';
import { kakaoBotControllers } from '../decorators/KakaoDecorator';
import { KakaoContextPolicies } from '../services/KakaoContextPolicies';

const initButtons = ['이벤트 찾기'];

@JsonController('/kakaochat')
export class KakaoController {

    private kakaoContextPolicies: KakaoContextPolicies;

    constructor(
        private restaurantEventService: RestaurantEventService,
        private kakaoContextService: KakaoContextService
    ) {
        this.kakaoContextPolicies = new KakaoContextPolicies(
            kakaoContextService,
            restaurantEventService
        );
    }

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
            buttons: initButtons,
        };
    }

    @Post('/message')
    public async handleMessage(@Body() body: KakaoPostMessageRequest): Promise<KakaoPostMessageResponse> {
        const userKey = body.user_key;
        const type = body.type;

        if (type === 'photo') {
            return new KakaoPostMessageResponse(KAKAO.noImageMent);
        }

        let context = await this.kakaoContextService.findOne(userKey);
        const res = new KakaoPostMessageResponse();

        if (context === undefined) {
            context = new KakaoContext();
            context.id = userKey;
            context = await this.kakaoContextService.create(context);
        }

        const handlerProperty = kakaoBotControllers[context.status];

        if (handlerProperty !== undefined) {
            const handlerResult = this.kakaoContextPolicies[handlerProperty](body, res, context);
            if (typeof handlerResult === typeof Promise) {
                await handlerResult;
            }
        } else {
            res.message.text = KAKAO.confusingMent;
        }

        return res;
    }

    @Post('/friend')
    public async handleNewFriend(@Body() body: KakaoPostFriendRequest): Promise<string> {
        const userKey = body.user_key;
        const context = new KakaoContext();
        context.id = userKey;
        await this.kakaoContextService.create(context);
        return 'Success';
    }

    @Delete('/friend/:userKey')
    public async handleLoseFriend(@Param('userKey') userKey: string): Promise<string> {
        await this.kakaoContextService.delete(userKey);
        return 'Success';
    }

    @Delete('/chat_room/:userKey')
    public async handleLeaveRoom(@Param('userKey') userKey: string): Promise<string> {
        const context = new KakaoContext();
        context.restaurantName = undefined;
        context.category = undefined;
        context.area = undefined;
        await this.kakaoContextService.update(userKey, context);
        return 'Success';
    }
}
