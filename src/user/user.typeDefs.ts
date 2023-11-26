export const userTypeDefs = `#graphql
scalar DateTime

type User {
    id: String
    email: String
    password: String
    name: String
    createdAt: DateTime
    posts: [Post]
}
type Query {
    getUsers: [User]
}
input CreateUserInput {
    email: String!
    password: String!
    name: String!
}
type Mutation {
    createUser(createUserInput: CreateUserInput!):User
}
`