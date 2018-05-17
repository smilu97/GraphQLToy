import * as Faker from 'faker';

import { define } from '../../lib/seed';
import { Restaurant } from '../../api/models/Restaurant';

define(Restaurant, (faker: typeof Faker) => {
    const name = faker.company.companyName();
    const category = faker.commerce.productMaterial();

    const restaurant = new Restaurant();
    restaurant.name = name;
    restaurant.category = category;
    return restaurant;
});
