"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
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
const server = new server_1.ApolloServer({
    typeDefs,
    resolvers,
});
(0, standalone_1.startStandaloneServer)(server);
