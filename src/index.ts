import { userResolver } from './user/user.resolver.js';
import { postResolver } from './post/post.resolver.js';
import { commentResolver } from './comment/comment.resolver.js';
import { ApolloServer } from 'apollo-server';
import { totalTypeDefs } from './total.typeDefs.js';

const typeDefs = `
    ${totalTypeDefs}
`;

const resolvers = {
    Query: {
        ...userResolver.Query,
        ...postResolver.Query,
        ...commentResolver.Query,
    },
    Mutation: {
        ...userResolver.Mutation,
        ...postResolver.Mutation,
        ...commentResolver.Mutation,
    },
};

const server = new ApolloServer({
    playground: true,
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`Server 4000 ${url}`);
});