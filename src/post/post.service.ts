import { Post, PrismaClient } from '@prisma/client';
import { ICreatePostInput } from './interface/post.interface.js';
const prisma = new PrismaClient()
export class PostService{
  getPosts(userId:string):Promise<Post[]>{
    console.log(userId);
    return prisma.post.findMany();
  }

  async createPost(createPostInput:ICreatePostInput):Promise<Post>{
    return prisma.post.create({
      data:{
        ...createPostInput
      }
    });
  }
}