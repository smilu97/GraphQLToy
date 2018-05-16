
export class KakaoPostMessageResponse {
    public message: object;
    public keyboard: object;

    constructor(msg: string) {
        this.message = {
            text: msg,
        };
    }
}
