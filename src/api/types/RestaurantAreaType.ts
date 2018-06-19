import {
    GraphQLFieldConfigMap,
    GraphQLID,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLContext,
} from 'graphql';
import { RestaurantOfArea } from './RestaurantType';
import { RestaurantArea } from '../models/RestaurantArea';
import { RestaurantService } from '../services/RestaurantService';

const RestaurantAreaFields: GraphQLFieldConfigMap = {
    id: {
        type: GraphQLID,
        description: 'The ID',
    },
    name: {
        type: GraphQLString,
        description: 'The name of the area.',
    },
};

export const AreaOfRestaurantType = new GraphQLObjectType({
    name: 'AreaOfRestaurant',
    description: 'Area of restaurant',
    fields: () => ({ ...RestaurantAreaFields, ...{} }),
});

export const RestaurantAreaType = new GraphQLObjectType({
    name: 'RestaurantArea',
    description: 'A single event.',
    fields: () => ({ ...RestaurantAreaFields, ...{
        restaurants: {
            type: new GraphQLList(RestaurantOfArea),
            description: 'The restaurants of the area',
            resolve: (area: RestaurantArea, args: any, context: GraphQLContext<any, any>) => {
                return context.container.get(RestaurantService).findWithAreaId(area.id);
            },
        },
    } }),
});
