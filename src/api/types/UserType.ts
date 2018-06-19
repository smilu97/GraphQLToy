import {
    GraphQLFieldConfigMap, GraphQLID, GraphQLObjectType, GraphQLString
} from 'graphql';

const UserFields: GraphQLFieldConfigMap = {
    id: {
        type: GraphQLID,
        description: 'The ID',
    },
    name: {
        type: GraphQLString,
        description: 'The name of the user.',
    },
    role: {
        type: GraphQLString,
        description: 'The role of the user.',
    },
    email: {
        type: GraphQLString,
        description: 'The email of this user.',
    },
    type: {
        type: GraphQLString,
        description: 'The type of this user.',
    },
};

export const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'A single user.',
    fields: () => ({ ...UserFields, ...{
        // pets: {
        //     type: new GraphQLList(PetOfUserType),
        //     description: 'The pets of a user',
        //     resolve: async (user: User, args: any, context: GraphQLContext<any, any>) =>
        //         // We use data-loaders to save db queries
        //         context.dataLoaders.petsByUserIds.load(user.id),
        //         // This would be the case with a normal service, but not very fast
        //         // context.container.get<PetService>(PetService).findByUser(user),
        // },
    } }),
});

export const OwnerType = new GraphQLObjectType({
    name: 'Owner',
    description: 'The owner of a pet',
    fields: () => ({ ...UserFields, ...{} }),
});

export const PublisherType = new GraphQLObjectType({
    name: 'Publisher',
    description: 'The publisher of a event',
    fields: () => ({ ...UserFields, ...{} }),
});
