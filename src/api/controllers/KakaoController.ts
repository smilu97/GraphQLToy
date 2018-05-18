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

const filterTypes = [
    {
        showing: '식당이름',
        column: 'restaurantName',
        status: KAKAO.status.RECEIVING_NAME,
    },
    {
        showing: '지역이름',
        column: 'area',
        status: KAKAO.status.RECEIVING_AREA,
    },
    {
        showing: '카테고리',
        column: 'category',
        status: KAKAO.status.RECEIVING_CATEGORY,
    },
];
const filterButtons = filterTypes.map((ft) => ft.showing).concat([KAKAO.toFirstMent]);
const statusToColumn = filterTypes.map((ft) => ({ [ft.status]: ft.column })).reduce((a, b) => ({ ...a, ...b }), {});
const initButtons = ['이벤트 찾기'];

@JsonController('/kakaochat')
export class KakaoController {

    constructor(
        private restaurantEventService: RestaurantEventService,
        private kakaoContextService: KakaoContextService
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

        const context = await this.kakaoContextService.findOne(userKey);
        const text = body.content;
        const res = new KakaoPostMessageResponse();

        if (context.status === KAKAO.status.NOT_STARTED) {
            // if (text === '이벤트 찾기')
            context.status = KAKAO.status.RECEIVING;
            this.kakaoContextService.update(context.id, context);
            res.message.text = KAKAO.askFilterMent;
            res.keyboard.type = 'buttons';
            res.keyboard.buttons = filterButtons;
            return res;
        }

        if (context.status === KAKAO.status.RECEIVING) {
            for (const filterType of filterTypes) {
                if (text === filterType.showing) {
                    context.status = filterType.status;
                    this.kakaoContextService.update(context.id, context);
                    res.message.text = `${filterType.showing}을 입력해주세요`;
                    return res;
                }
            }
            if (text === KAKAO.toFirstMent) {
                context.status = KAKAO.status.NOT_STARTED;
                context.restaurantName = undefined;
                context.category = undefined;
                context.area = undefined;
                this.kakaoContextService.update(context.id, context);
                res.message.text = KAKAO.goneFirstMent;
                res.keyboard.type = 'buttons';
                res.keyboard.buttons = initButtons;
                return res;
            }
            res.message.text = KAKAO.confusingMent;
            return res;
        }

        if (context.status === KAKAO.status.RECEIVING_AREA ||
            context.status === KAKAO.status.RECEIVING_NAME ||
            context.status === KAKAO.status.RECEIVING_CATEGORY) {

            context[statusToColumn[context.status]] = text;
            res.message.text = (await this.restaurantEventService.findByNameOrCategoryOrArea(
                context.restaurantName, context.category, context.area))
                .map((evt) => evt.name)
                .reduce((a, b) => `${a}\n${b}`, '');
            if (res.message.text.length === 0) {
                res.message.text = KAKAO.noResultMent;
            }
            context.status = KAKAO.status.RECEIVING;
            this.kakaoContextService.update(context.id, context);

            res.keyboard.type = 'buttons';
            res.keyboard.buttons = filterButtons;

            return res;
        }

        res.message.text = KAKAO.confusingMent;
        return res;
    }

    @Post('/friend')
    public handleNewFriend(@Body() body: KakaoPostFriendRequest): void {
        const userKey = body.user_key;
        const context = new KakaoContext();
        context.id = userKey;
        this.kakaoContextService.create(context);
    }

    @Delete('/friend/:userKey')
    public handleLoseFriend(@Param('userKey') userKey: string): void {
        this.kakaoContextService.delete(userKey);
    }

    @Delete('/chat_room/:userKey')
    public async handleLeaveRoom(@Param('userKey') userKey: string): Promise<void> {
        const context = new KakaoContext();
        context.restaurantName = undefined;
        context.category = undefined;
        context.area = undefined;
        await this.kakaoContextService.update(userKey, context);
    }
}
