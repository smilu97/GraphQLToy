import {
    GraphQLFieldConfigMap,
    GraphQLID,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
} from 'graphql';

import { GraphQLContext } from '../../lib/graphql';
import { EventOfRestaurantType } from './RestaurantEventType';
import { Restaurant } from '../models/Restaurant';
import { OwnerType } from './UserType';

const RestaurantFields: GraphQLFieldConfigMap = {
    id: {
        type: GraphQLID,
        description: 'The ID',
    },
    name: {
        type: GraphQLString,
        description: 'The name of the restaurant.',
    },
    category: {
        type: GraphQLString,
        description: 'The category of the restaurant.',
    },
};

export const RestaurantOfEventType = new GraphQLObjectType({
    name: 'RestaurantOfEvent',
    description: 'Restaurant of event',
    fields: () => ({ ...RestaurantFields, ...{} }),
});

export const RestaurantOfArea = new GraphQLObjectType({
    name: 'RestaurantOfArea',
    description: 'Restaurant of area',
    fields: () => ({ ...RestaurantFields, ...{} }),
});

export const RestaurantType = new GraphQLObjectType({
    name: 'Restaurant',
    description: 'A single event.',
    fields: () => ({ ...RestaurantFields, ...{
        events: {
            type: new GraphQLList(EventOfRestaurantType),
            description: 'The events of the restaurant',
            resolve: (restaurant: Restaurant, args: any, context: GraphQLContext<any, any>) =>
                context.dataLoaders.eventsByRestaurantIds.load(restaurant.id),
        },
        // areas: {
        //     type: new GraphQLList(AreaOfRestaurantType),
        //     description: 'The events of the restaurant',
        //     resolve: (restaurant: Restaurant, args: any, context: GraphQLContext<any, any>) =>
        //         context.dataLoaders.areasByRestaurantIds.load(restaurant.id),
        // },
        owner: {
            type: OwnerType,
            description: 'The events of the restaurant',
            resolve: (restaurant: Restaurant, args: any, context: GraphQLContext<any, any>) =>
                context.dataLoaders.user.load(restaurant.ownerId),
        },
    } }),
});
