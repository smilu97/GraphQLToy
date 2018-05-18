
export interface KakaoMessage {
    text: string;
    photo?: KakaoPhoto;
    message_button?: KakaoMessageButton;
}

export interface KakaoPhoto {
    url: string;
    width: number;
    height: number;
}

export interface KakaoMessageButton {
    label: string;
    url: string;
}

export interface KakaoKeyboard {
    type: 'buttons' | 'text';
    buttons?: string[];
}

export class KakaoPostMessageResponse {
    public message: KakaoMessage;
    public keyboard: KakaoKeyboard;

    constructor(text?: string) {
        this.message.text = text;
    }
    public setKeyboardButtons(buttons: string[]): void {
        this.keyboard.type = 'buttons';
        this.keyboard.buttons = buttons;
    }
    public setKeyboardText(): void {
        this.keyboard.type = 'text';
        this.keyboard.buttons = undefined;
    }
    public setMessagePhoto(url: string, width: number, height: number): void {
        this.message.photo = { url, width, height };
    }
    public setMessageButton(label: string, url: string): void {
        this.message.message_button = { label, url };
    }
}
