import {
    GraphQLFieldConfigMap, GraphQLID, GraphQLObjectType, GraphQLString
} from 'graphql';

import { GraphQLContext } from '../../lib/graphql';
import { PublisherType } from './UserType';
import { RestaurantEvent } from '../models/RestaurantEvent';
import { RestaurantType } from './RestaurantType';

const RestaurantEventFields: GraphQLFieldConfigMap = {
    id: {
        type: GraphQLID,
        description: 'The ID',
    },
    name: {
        type: GraphQLString,
        description: 'The name of the restaurant event.',
    },
};

export const EventOfRestaurantType = new GraphQLObjectType({
    name: 'EventOfRestaurant',
    description: 'Restaurant event',
    fields: () => ({ ...RestaurantEventFields, ...{} }),
});

export const EventOfPublisherType = new GraphQLObjectType({
    name: 'EventOfPublisher',
    description: 'Publisher event',
    fields: () => ({ ...RestaurantEventFields, ...{} }),
});

export const RestaurantEventType = new GraphQLObjectType({
    name: 'RestaurantEvent',
    description: 'A single event.',
    fields: () => ({ ...RestaurantEventFields, ...{
        publisher: {
            type: PublisherType,
            description: 'publisher of event',
            resolve: (resEvent: RestaurantEvent, args: any, context: GraphQLContext<any, any>) =>
                context.dataLoaders.user.load(resEvent.publisherId),
        },
        restaurant: {
            type: RestaurantType,
            description: 'restaurant of event',
            resolve: (resEvent: RestaurantEvent, args: any, context: GraphQLContext<any, any>) =>
                context.dataLoaders.restaurant.load(resEvent.restaurantId),
        },
    } }),
});
