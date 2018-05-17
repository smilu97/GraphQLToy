import {
    Body, Get, JsonController, Post
} from 'routing-controllers';

import { KakaoPostMessageRequest } from './requests/KakaoRequests';
import { KakaoPostMessageResponse } from './responses/KakaoResponses';

@JsonController('/kakaochat')
export class PetController {

    @Get('/keyboard')
    public getKeyboard(): object {
        return {
            type: 'buttons',
            buttons: ['선택 1', '선택 2', '선택 3'],
        };
    }

    @Post('/message')
    public handleMessage(@Body() body: KakaoPostMessageRequest): KakaoPostMessageResponse {
        const res = new KakaoPostMessageResponse('Testing');
        return res;
    }
}
