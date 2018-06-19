import * as Faker from 'faker';

import { define } from '../../lib/seed';
import { RestaurantEvent } from '../../api/models/RestaurantEvent';

define(RestaurantEvent, (faker: typeof Faker, settings: {
    restaurantId: string,
    publisherId: string,
}): RestaurantEvent => {
    const resEvent = new RestaurantEvent();
    resEvent.name = faker.random.word();
    resEvent.restaurantId = settings.restaurantId;
    resEvent.publisherId = settings.publisherId;
    return resEvent;
});
