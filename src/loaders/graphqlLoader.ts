import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';

import { UserRepository } from '../api/repositories/UserRepository';
import { env } from '../env';
import { createDataLoader, createGraphQLServer } from '../lib/graphql';
import { RestaurantEventRepository } from '../api/repositories/RestaurantEventRepository';
import { RestaurantAreaRepository } from '../api/repositories/RestaurantAreaRepository';
import { RestaurantRepository } from '../api/repositories/RestaurantRepository';

export const graphqlLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings && env.graphql.enabled) {
        const expressApp = settings.getData('express_app');

        createGraphQLServer(expressApp, {
            route: env.graphql.route,
            editorEnabled: env.graphql.editor,
            queries: env.app.dirs.queries,
            mutations: env.app.dirs.mutations,
            dataLoaders: {
                user: createDataLoader(UserRepository),
                restaurant: createDataLoader(RestaurantRepository),
                restaurantEvent: createDataLoader(RestaurantEventRepository),
                restaurantArea: createDataLoader(RestaurantAreaRepository),
                eventsByRestaurantIds: createDataLoader(RestaurantEventRepository, {
                    method: 'findByRestaurantIds',
                    key: 'restaurantId',
                    multiple: true,
                }),
            },
        });

    }
};
