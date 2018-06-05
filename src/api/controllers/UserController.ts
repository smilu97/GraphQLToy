import {
    Authorized, Body, CurrentUser, Delete, Get, JsonController, OnUndefined, Param, Post, Put
} from 'routing-controllers';

import { UserNotFoundError } from '../errors/UserNotFoundError';
import { User } from '../models/User';
import { UserService } from '../services/UserService';

@JsonController('/users')
export class UserController {

    constructor(
        private userService: UserService
    ) { }

    @Authorized()
    @Get()
    public async find( @CurrentUser() user?: User): Promise<User> {
        return user;
    }

    @Get('/:id')
    @OnUndefined(UserNotFoundError)
    public one( @Param('id') id: string): Promise<User | undefined> {
        return this.userService.findOne(id);
    }

    @Post()
    public create( @Body() user: User): Promise<User> {
        return this.userService.create(user);
    }

    @Authorized()
    @Put('/:id')
    public update( @Param('id') id: string, @Body() user: User): Promise<User> {
        return this.userService.update(id, user);
    }

    @Authorized()
    @Delete('/:id')
    public delete( @Param('id') id: string): Promise<void> {
        return this.userService.delete(id);
    }

}
