import { Post } from '@prisma/client';
import { ICreatePostInput } from './interface/post.interface.js';
import { PostService } from './post.service.js';

const postService = new PostService();
export const postResolver ={
  Query: {
    getPosts: (_: any, { userId }: { userId: string }): Promise<Post[]> => {
      console.log('시작');
      console.log(userId);
      return postService.getPosts(userId);
    },
  },
  Mutation:{
    createPost: async (parent: any, { createPostInput }: {
      createPostInput: ICreatePostInput
    }):Promise<Post> => {
      return  postService.createPost(createPostInput);
    },
  }
}