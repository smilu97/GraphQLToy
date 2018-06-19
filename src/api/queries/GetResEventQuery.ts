import { GraphQLFieldConfig, GraphQLList, GraphQLString } from 'graphql';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { AbstractGraphQLQuery, GraphQLContext, Query } from '../../lib/graphql';
import { RestaurantEvent } from '../models/RestaurantEvent';
import { RestaurantEventService } from '../services/RestaurantEventService';
import { RestaurantEventType } from '../types/RestaurantEventType';

@Query()
export class GetResEventQuery extends AbstractGraphQLQuery<GraphQLContext<any, any>, any[], any> implements GraphQLFieldConfig {
    public type = new GraphQLList(RestaurantEventType);
    public allow = [];
    public args = {
        name: { type: GraphQLString },
        restaurantId: { type: GraphQLString },
    };

    constructor(
        private restaurantEventService: RestaurantEventService,
        @Logger(__filename) private log: LoggerInterface
    ) {
        super();
    }

    public async run(root: any, args: any, context: GraphQLContext<any, any>): Promise<RestaurantEvent[]> {
        const restaurants = await this.restaurantEventService.find(args);
        this.log.info(`Found ${restaurants.length} pets`);
        return restaurants;
    }

}
