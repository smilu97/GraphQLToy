import { Action } from 'routing-controllers';
import { Connection } from 'typeorm';

import { User } from '../api/models/User';
import { Logger } from '../lib/logger';
import { UserService } from '../api/services/UserService';

export function currentUserChecker(connection: Connection): (action: Action) => Promise<User | undefined> {
    const log = new Logger(__filename);

    return async function innerCurrentUserChecker(action: Action): Promise<User | undefined> {
        // here you can use request/response objects from action
        // you need to provide a user object that will be injected in controller actions
        // demo code:
        const name: string = action.request.name;
        const password: string = UserService.encryptPassword(action.request.password);

        const em = connection.createEntityManager();
        const user = await em.findOne<User>(User, {
            where: {
                name,
                password,
            },
        });
        if (user) {
            log.info('Current user is ', user.toString());
        } else {
            log.info('Current user is undefined');
        }

        return user;
    };
}
