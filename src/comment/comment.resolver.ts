import { Comment } from '@prisma/client';
import { ICreateCommentInput } from './interface/comment.interface.js';
import { CommentService } from './comment.service.js';
import { PostService } from '../post/post.service.js';
import { UserService } from '../user/user.service.js';

const userService = new UserService();
const postService = new PostService(userService);
const commentService = new CommentService(postService);
export const commentResolver = {
  Query: {
    getComments: (): Promise<Comment[]> => {
      return commentService.getComments();
    },
  },
  Mutation: {
    createComment: async (
      parent: any,
      {
        createCommentInput,
      }: {
        createCommentInput: ICreateCommentInput;
      },
    ): Promise<Comment> => {
      return commentService.createComment(createCommentInput);
    },
  },
};
