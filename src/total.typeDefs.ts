export const totalTypeDefs = `#graphql
scalar DateTime
type User {
    id: String
    email: String
    password: String
    name: String
    createdAt: DateTime
    posts: [Post]
}

type Post {
    id: String
    title: String
    content: String
    isPublished: Boolean
    authorId: String
    createdAt: DateTime
    author: User
    comments: [Comment]
}

type Comment {
    id: String
    content: String
    postId: String
    createdAt: DateTime
    post: Post
}

input CreateUserInput {
    email: String!
    password: String!
    name: String!
}

input CreatePostInput {
    title: String!
    content: String
    isPublished: Boolean
    authorId: String!
}

input CreateCommentInput {
    content: String!
    postId: String!
}

type Query {
    getUsers: [User]
    getPosts(userId: String!): [Post]
    getComments: [Comment]
}

type Mutation {
    createUser(createUserInput: CreateUserInput!):User
    createPost(createPostInput: CreatePostInput!):Post
    createComment(createCommentInput: CreateCommentInput!):Comment
}
`;


