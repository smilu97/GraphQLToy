import { Connection } from 'typeorm';

import { User } from '../../../src/api/models/User';
import { Factory, Seed } from '../../lib/seed/types';
import { UserService } from '../../api/services/UserService';

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

        const user = new User();
        user.email = 'bruce.wayne@wayne-enterprises.com';
        user.name = 'Bruce';
        user.password = UserService.encryptPassword('bruce1234');
        user.role = 'USER';
        user.type = 'local';
        return await em.save(user);
    }

}
