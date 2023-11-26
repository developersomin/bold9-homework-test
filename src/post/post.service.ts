import { Post, PrismaClient } from '@prisma/client';
import { ICreatePostInput } from './interface/post.interface.js';
const prisma = new PrismaClient()
export class PostService{
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

  async createPost(createPostInput:ICreatePostInput):Promise<Post>{
    return prisma.post.create({
      data:{
        ...createPostInput
      }
    });
  }
}