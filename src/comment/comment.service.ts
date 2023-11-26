import { Comment, PrismaClient } from '@prisma/client';
import { ICreateCommentInput } from './interface/comment.interface.js';
import { PostService } from '../post/post.service.js';
const prisma = new PrismaClient()
export class CommentService{
  constructor(
    private readonly postService: PostService,
  ) {
  }

  getComments():Promise<Comment[]>{
    return prisma.comment.findMany();
  }

  async createComment(createCommentInput: ICreateCommentInput): Promise<Comment> {
    const {content,postId} = createCommentInput;
    const post = await this.postService.getPostById(postId);
    if(!post){
      throw new Error('요청하신 게시물 ID가 없습니다.');
    }
    return prisma.comment.create({
      data: {
        content,
        postId
      },
    });
  }
}