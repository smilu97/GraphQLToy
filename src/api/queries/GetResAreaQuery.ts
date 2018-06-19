import { GraphQLFieldConfig, GraphQLList } from 'graphql';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { AbstractGraphQLQuery, GraphQLContext, Query } from '../../lib/graphql';
import { RestaurantAreaType } from '../types/RestaurantAreaType';
import { RestaurantArea } from '../models/RestaurantArea';
import { RestaurantAreaService } from '../services/RestaurantAreaService';

@Query()
export class GetResAreaQuery extends AbstractGraphQLQuery<GraphQLContext<any, any>, any[], any> implements GraphQLFieldConfig {
    public type = new GraphQLList(RestaurantAreaType);
    public allow = [];
    public args = {};

    constructor(
        private restaurantAreaService: RestaurantAreaService,
        @Logger(__filename) private log: LoggerInterface
    ) {
        super();
    }

    public async run(root: any, args: any, context: GraphQLContext<any, any>): Promise<RestaurantArea[]> {
        const areas = await this.restaurantAreaService.find();
        this.log.info(`Found ${areas.length} pets`);
        return areas;
    }

}
