import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from "@apollo/server/standalone";
import { userResolver } from './user/user.resolver.js';
import path from 'path';
import { userTypeDefs } from './user/user.typeDefs.js';
import { postTypeDefs } from './post/post.typeDefs.js';
import { commentTypeDefs } from './comment/comment.typeDefs.js';

/*const typeDefs = `#graphql
    type User {
        id: String
        email: String
        password: String
        name: String
        createdAt: String
        posts: [Post]
    }
    type Post {
        id: String
        title: String
        content: String
        isPublished: Boolean
        authorId: String
        createdAt: String
        author: User
        comments: [Comment]
    }
    type Comment {
        id: String
        content: String
        postId: String
        createdAt: String
        post: Post
    }
    type Query {
        getUsers: User
    }
    input CreateUserInput {
        email: String!
        password: String!
        name: String!
    }
    type Mutation {
        createUser(createUserInput: CreateUserInput!):User
    }
`*/

const typeDefs =`
    ${userTypeDefs}
    ${postTypeDefs}
    ${commentTypeDefs}
`

const resolvers = {
    ...userResolver,
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

startStandaloneServer(server);