import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';
import { events } from '../subscribers/events';

import * as crypto from 'crypto';
import { FacebookLoginRequest } from '../controllers/requests/FacebookRequests';
import { RestaurantRepository } from '../repositories/RestaurantRepository';
import { Restaurant } from '../models/Restaurant';

@Service()
export class UserService {

    public static encryptPassword(password: string): string {
        const res = crypto.createHash('sha256')
            .update(password + 'bluefrog88')
            .digest('base64');
        return res;
    }

    constructor(
        @OrmRepository() private userRepository: UserRepository,
        @OrmRepository() private restaurantRepository: RestaurantRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(): Promise<User[]> {
        this.log.info('Find all users');
        return this.userRepository.find({ relations: ['pets'] });
    }

    public findOne(id: string): Promise<User | undefined> {
        this.log.info('Find all users');
        return this.userRepository.findOne({ id });
    }

    public async findWithEmailPassword(email: string, password: string): Promise<User | undefined> {
        password = UserService.encryptPassword(password);
        const user = await this.userRepository.findOne({
            email, password,
        });
        return user;
    }

    public async create(user: User): Promise<User> {
        this.log.info('Create a new user => ', user.toString());
        if (user.password.length === 0) {
            return undefined;
        }
        user.role = 'USER';
        user.password = UserService.encryptPassword(user.password);
        user.type = 'local';
        const newUser = await this.userRepository.save(user);
        this.eventDispatcher.dispatch(events.user.created, newUser);
        return newUser;
    }

    public async createWithFacebook(req: FacebookLoginRequest): Promise<User> {
        return await this.userRepository.create({
            id: 'fb:' + req.profile.id,
            role: 'USER',
            type: 'facebook',
        });
    }

    public update(id: string, user: User): Promise<User> {
        this.log.info('Update a user');
        user.id = id;
        user.role = 'USER';
        user.password = undefined;
        return this.userRepository.save(user);
    }

    public async delete(id: string): Promise<void> {
        this.log.info('Delete a user');
        await this.userRepository.delete(id);
        return;
    }

    public async findRestaurants(user: User): Promise<Restaurant[]> {
        const restaurants = await this.restaurantRepository.find({
            where: {
                ownerId: user.id,
            },
        });
        return restaurants;
    }

}
