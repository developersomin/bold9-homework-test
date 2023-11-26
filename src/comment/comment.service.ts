import { Comment, Post, PrismaClient } from '@prisma/client';
import { ICreateCommentInput } from './interface/comment.interface.js';
const prisma = new PrismaClient()
export class CommentService{
  getComments():Promise<Comment[]>{
    return prisma.comment.findMany();
  }

  async createComment(createCommentInput: ICreateCommentInput): Promise<Comment> {
    return prisma.comment.create({
      data: {
        ...createCommentInput,
      },
    });
  }
}