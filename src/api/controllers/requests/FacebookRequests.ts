
export interface FacebookLoginRequest {
    profile: {
        email: string,
        gender: 'male' | 'female',
        id: string,
        name: string,
    };
    tokenDetail: {
        accessToken: string,
        userID: string,
    };
}
