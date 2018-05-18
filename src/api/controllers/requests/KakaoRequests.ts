
export interface KakaoPostMessageRequest {
    user_key: string;
    type: 'text' | 'photo';
    content: string;
}
