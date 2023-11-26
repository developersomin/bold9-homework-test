export const commentTypeDefs = `#graphql
    type Comment {
        id: String
        content: String
        postId: String
        createdAt: DateTime
        post: Post
    }
    type Query {
        getComments: [Comment]
    }
    input CreateCommentInput {
        content: String!
        postId: String!
    }
    type Mutation {
        createComment(createCommentInput: CreateCommentInput!):Comment
    }
`