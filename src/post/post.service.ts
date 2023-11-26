import { Post, PrismaClient } from '@prisma/client';
import { ICreatePostInput } from './interface/post.interface.js';
import { UserService } from '../user/user.service.js';
const prisma = new PrismaClient()
export class PostService{
  constructor(
    private readonly userService: UserService
  ) {
  }

   getPosts(userId:string):Promise<Post[]>{
     return prisma.post.findMany({
      where: {
        authorId: userId,
        isPublished:true,
        content: {
          contains: "graphql"
        },
      },
       include:{
        comments:true
       }
    });
  }

  getPostById(postId: string): Promise<Post | null> {
    return prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
  }

  async createPost(createPostInput:ICreatePostInput):Promise<Post>{
    const { title, authorId, content, isPublished } = createPostInput;
    const user = await this.userService.getUserById(authorId);
    if(!user){
      throw new Error("저자 ID 가 존재 하지 않습니다.")
    }
    return prisma.post.create({
      data:{
        title,
        authorId,
        content,
        isPublished,
      }
    });
  }
}