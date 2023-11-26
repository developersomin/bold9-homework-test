export const commentTypeDefs = `#graphql
    type Comment {
        id: String
        content: String
        postId: String
        createdAt: String
        post: Post
    }
`