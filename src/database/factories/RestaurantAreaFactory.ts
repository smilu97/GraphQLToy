import * as Faker from 'faker';

import { define } from '../../lib/seed';
import { RestaurantArea } from '../../api/models/RestaurantArea';

define(RestaurantArea, (faker: typeof Faker) => {
    const name = faker.random.word();
    const area = new RestaurantArea();
    area.name = name;
    return area;
});
