import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from "@apollo/server/standalone";
import { userResolver } from './user/user.resolver.js';
import { userTypeDefs } from './user/user.typeDefs.js';
import { postTypeDefs } from './post/post.typeDefs.js';
import { commentTypeDefs } from './comment/comment.typeDefs.js';
import { postResolver } from './post/post.resolver.js';

const typeDefs =`
    ${userTypeDefs}
    ${postTypeDefs}
    ${commentTypeDefs}
`

const resolvers = {
    ...userResolver,
    ...postResolver
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

startStandaloneServer(server);