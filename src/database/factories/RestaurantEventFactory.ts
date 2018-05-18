import * as Faker from 'faker';

import { define } from '../../lib/seed';
import { RestaurantEvent } from '../../api/models/RestaurantEvent';
import { Restaurant } from '../../api/models/Restaurant';

define(RestaurantEvent, (faker: typeof Faker, restaurant: Restaurant) => {
    const event = new RestaurantEvent();
    event.name = faker.random.word();
    event.restaurant = restaurant;
    return event;
});
