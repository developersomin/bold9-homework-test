export const postTypeDefs = `#graphql
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
    input CreatePostInput {
        title: String!
        content: String
        isPublished: Boolean
        authorId: String!
    }
    type Query {
        getPosts(userId: String!): [Post]
    }
    type Mutation {
        createPost(createPostInput: CreatePostInput!):Post
    }
`