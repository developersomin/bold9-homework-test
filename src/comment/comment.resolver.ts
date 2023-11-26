
import { Comment } from '@prisma/client';
import { ICreateCommentInput } from './interface/comment.interface.js';
import { CommentService } from './comment.service.js';

const commentService = new CommentService();
export const commentResolver ={
  Query: {
    getComments: (): Promise<Comment[]> => {
      return commentService.getComments();
    },
  },
  Mutation:{
    createComment: async (parent: any, { createCommentInput }: {
      createCommentInput: ICreateCommentInput
    }):Promise<Comment> => {
      return  commentService.createComment(createCommentInput);
    },
  }
}