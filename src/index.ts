import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from "@apollo/server/standalone";
import { userResolver } from './user/user.resolver.js';
import { userTypeDefs } from './user/user.typeDefs.js';
import { postTypeDefs } from './post/post.typeDefs.js';
import { commentTypeDefs } from './comment/comment.typeDefs.js';
import { postResolver } from './post/post.resolver.js';
import { commentResolver } from './comment/comment.resolver.js';

const typeDefs =`
    ${userTypeDefs}
    ${postTypeDefs}
    ${commentTypeDefs}
`

const resolvers = {
    Query:{
        ...userResolver.Query,
        ...postResolver.Query,
        ...commentResolver.Query,
    },
    Mutation:{
        ...userResolver.Mutation,
        ...postResolver.Mutation,
        ...commentResolver.Mutation,
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

startStandaloneServer(server);