import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from "@apollo/server/standalone";


const typeDefs = `#graphql
    type Query {
        qqq: String
    }
`;
const resolvers = {
    Query: {
        qqq: () => {
            return '서버 작동';
        },
    },
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

await startStandaloneServer(server);