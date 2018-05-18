import { Connection } from 'typeorm';

import { Factory, Seed } from '../../lib/seed/types';
import { Restaurant } from '../../api/models/Restaurant';
import { times } from '../../lib/seed';
import { RestaurantArea } from '../../api/models/RestaurantArea';
import { RestaurantEvent } from '../../api/models/RestaurantEvent';

export class CreateRestaurants implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<any> {
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

        const areas = await factory(RestaurantArea)().seedMany(5);
        await times(10, async (n) => {
            const restaurant = await factory(Restaurant)().make();
            restaurant.areas = [areas[n], areas[(n + 1) % 5]];
            em.save(restaurant);
            const events = await factory(RestaurantEvent)().seedMany(3);
            await times(3, async (idx) => {
                events[idx].restaurant = restaurant;
                return await em.save(events[idx]);
            });
        });
    }

}
