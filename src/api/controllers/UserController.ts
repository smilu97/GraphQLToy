import {
    Authorized, Body, CurrentUser, Delete, JsonController, Post, Put
} from 'routing-controllers';

import jwt from 'jsonwebtoken';
// import { UserNotFoundError } from '../errors/UserNotFoundError';
import { User } from '../models/User';
import { UserService } from '../services/UserService';
import { FacebookLoginRequest } from './requests/FacebookRequests';
import facebookVerifier from './verifiers/FacebookVerifier';
import { env } from '../../env';

@JsonController('/users')
export class UserController {

    constructor(
        private userService: UserService
    ) { }

    @Post('/auth/facebook')
    public async authFacebook( @Body() body: FacebookLoginRequest ): Promise<{
        success: boolean,
        user?: User,
        jwtToken?: string,
        error?: string,
    }> {
        if (await facebookVerifier(body) === false) {
            return {
                error: 'Strange facebook login request',
                success: false,
            };
        }
        const localId = 'fb:' + body.profile.id;
        let user = await this.userService.findOne(localId);
        if (!user) {
            user = await this.userService.createWithFacebook(body);
        }
        const jwtToken = jwt.sign({
            id: localId,
        }, env.app.secret);
        return {
            success: true,
            user,
            jwtToken,
        };
    }

    @Post('/auth/local')
    public async find( @Body() body: { email: string, password: string }): Promise<{
        success: boolean,
        user?: User,
        jwtToken?: string,
        error?: string,
    }> {
        const { email, password } = body;
        const user = await this.userService.findWithEmailPassword(email, password);
        if (user) {
            const jwtToken = jwt.sign({
                id: user.id,
            }, env.app.secret);
            return {
                success: true,
                user,
                jwtToken,
            };
        } else {
            return {
                success: false,
                error: 'User not found',
            };
        }
    }

    @Post()
    public async create( @Body() userData: User): Promise<{
        success: boolean,
        user?: User,
        error?: any,
    }> {
        try {
            const user = await this.userService.create(userData);
            if (user) {
                return {
                    success: true,
                    user,
                };
            } else {
                return {
                    success: false,
                    error: 'Failed to create user',
                };
            }
        } catch (e) {
            return {
                success: false,
                error: e,
            };
        }
    }

    @Authorized()
    @Put()
    public async update( @CurrentUser() user: User, @Body() userData: User): Promise<{
        success: boolean,
    }> {
        try {
            await this.userService.update(user.id, user);
            return { success: true };
        } catch (e) {
            return { success: false };
        }
    }

    @Authorized()
    @Delete()
    public async delete( @CurrentUser() user: User): Promise<{
        success: boolean,
    }> {
        try {
            await this.userService.delete(user.id);
            return { success: true };
        } catch (e) {
            return { success: false };
        }
    }

}
