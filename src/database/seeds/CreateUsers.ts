import { Connection } from 'typeorm/connection/Connection';

import { User } from '../../../src/api/models/User';
import { Factory, Seed } from '../../lib/seed/types';
import { RestaurantArea } from '../../api/models/RestaurantArea';
import { Restaurant } from '../../api/models/Restaurant';
import { RestaurantEvent } from '../../api/models/RestaurantEvent';
import { times } from '../../lib/seed';

export class CreateUsers implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<any> {
        const users = await factory(User)().seedMany(10);

        const em = connection.createEntityManager();

        const areas = await factory(RestaurantArea)().seedMany(5);
        await times(10, async (n) => {
            const restaurant = await factory(Restaurant)().make();
            restaurant.areas = [areas[n % 5], areas[(n + 1) % 5]];
            restaurant.owner = users[n];
            em.save(restaurant);
            const events = await factory(RestaurantEvent)().seedMany(3);
            await times(3, async (idx) => {
                events[idx].publisher = users[(n + 1) % 10];
                events[idx].restaurant = restaurant;
                return await em.save(events[idx]);
            });
        });
    }

}
