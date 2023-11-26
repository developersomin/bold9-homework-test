export const postTypeDefs = `#graphql
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
`