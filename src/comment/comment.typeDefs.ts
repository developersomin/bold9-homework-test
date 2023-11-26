export const commentTypeDefs = `#graphql
    type Comment {
        id: String
        content: String
        postId: String
        createdAt: DateTime
        post: Post
    }
`