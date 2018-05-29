import * as Faker from 'faker';

import { User } from '../../../src/api/models/User';
import { define } from '../../lib/seed';

define(User, (faker: typeof Faker, settings: { role: string }) => {
    const gender = faker.random.number(1);
    const firstName = faker.name.firstName(gender);
    const email = faker.internet.email(firstName);
    const password = faker.internet.password(10);

    const user = new User();
    user.name = firstName;
    user.email = email;
    user.password = password;
    user.role = 'USER';
    return user;
});
