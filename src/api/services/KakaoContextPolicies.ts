import { KakaoContextController } from '../decorators/KakaoDecorator';
import { KAKAO } from '../constants/KakaoConstants';
import { KakaoContextService } from './KakaoContextService';
import { KakaoPostMessageRequest } from '../controllers/requests/KakaoRequests';
import { KakaoPostMessageResponse } from '../controllers/responses/KakaoResponses';
import { KakaoContext } from '../models/KakaoContext';
import { RestaurantEventService } from './RestaurantEventService';

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

export class KakaoContextPolicies {

    constructor(
        private kakaoContextService: KakaoContextService,
        private restaurantEventService: RestaurantEventService
    ) {}

    @KakaoContextController(KAKAO.status.NOT_STARTED)
    public handleNotStarted(
        req: KakaoPostMessageRequest,
        res: KakaoPostMessageResponse,
        context: KakaoContext): void {

        // if (text === '이벤트 찾기')
        context.status = KAKAO.status.RECEIVING;
        this.kakaoContextService.update(context.id, context);
        res.message.text = KAKAO.askFilterMent;
        res.keyboard.type = 'buttons';
        res.keyboard.buttons = filterButtons;
    }

    @KakaoContextController(KAKAO.status.RECEIVING)
    public handleReceiving(
        req: KakaoPostMessageRequest,
        res: KakaoPostMessageResponse,
        context: KakaoContext): void {

        const text = req.content;
        for (const filterType of filterTypes) {
            if (text === filterType.showing) {
                context.status = filterType.status;
                this.kakaoContextService.update(context.id, context);
                res.message.text = `${filterType.showing}을 입력해주세요`;
                return;
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
            return;
        }
        res.message.text = KAKAO.confusingMent;
    }

    @KakaoContextController(KAKAO.status.RECEIVING_AREA)
    @KakaoContextController(KAKAO.status.RECEIVING_CATEGORY)
    @KakaoContextController(KAKAO.status.RECEIVING_NAME)
    public async handleReceivingContent(
        req: KakaoPostMessageRequest,
        res: KakaoPostMessageResponse,
        context: KakaoContext): Promise<void> {

        const text = req.content;
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
    }

}
