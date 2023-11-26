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
    type Query {
        getPosts: [Post]
    }
    input CreatePostInput {
        title: String!
        content: String
        isPublished: Boolean
        authorId: String!
    }
    type Mutation {
        createPost(createPostInput: CreatePostInput!):Post
    }
`