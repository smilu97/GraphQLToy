
export interface KakaoPostMessageRequest {
    user_key: string;
    type: 'text' | 'photo';
    content: string;
}

export interface KakaoPostFriendRequest {
    user_key: string;
}
