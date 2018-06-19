import { GraphQLFieldConfig, GraphQLList, GraphQLString } from 'graphql';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { AbstractGraphQLQuery, GraphQLContext, Query } from '../../lib/graphql';
import { RestaurantType } from '../types/RestaurantType';
import { RestaurantService } from '../services/RestaurantService';
import { Restaurant } from '../models/Restaurant';

@Query()
export class GetRestaurantQuery extends AbstractGraphQLQuery<GraphQLContext<any, any>, any[], any> implements GraphQLFieldConfig {
    public type = new GraphQLList(RestaurantType);
    public allow = [];
    public args = {
        name: { type: GraphQLString },
    };

    constructor(
        private restaurantService: RestaurantService,
        @Logger(__filename) private log: LoggerInterface
    ) {
        super();
    }

    public async run(root: any, args: any, context: GraphQLContext<any, any>): Promise<Restaurant[]> {
        const restaurants = await this.restaurantService.find(args);
        this.log.info(`Found ${restaurants.length} pets`);
        return restaurants;
    }

}
