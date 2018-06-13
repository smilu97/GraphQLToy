import { Connection } from 'typeorm';

import { User } from '../../../src/api/models/User';
import { Factory, Seed } from '../../lib/seed/types';
import { UserService } from '../../api/services/UserService';
import { Restaurant } from '../../api/models/Restaurant';

export class CreateBruce implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<User> {
        // const userFactory = factory<User, { role: string }>(User as any);
        // const adminUserFactory = userFactory({ role: 'admin' });

        // const bruce = await adminUserFactory.make();
        // console.log(bruce);

        // const bruce2 = await adminUserFactory.seed();
        // console.log(bruce2);

        // const bruce3 = await adminUserFactory
        //     .map(async (e: User) => {
        //         e.firstName = 'Bruce';
        //         return e;
        //     })
        //     .seed();
        // console.log(bruce3);

        // return bruce;

        // const connection = await factory.getConnection();
        const em = connection.createEntityManager();

        let user = new User();
        user.email = 'frog';
        user.name = 'frog';
        user.password = UserService.encryptPassword('1234');
        user.role = 'ADMIN';
        user.type = 'local';
        user = await em.save(user);

        let restaurants = await factory(Restaurant)().seedMany(3);
        restaurants = await em.save(restaurants);
        user.restaurants = restaurants;
        user = await em.save(user);

        return user;
    }

}
