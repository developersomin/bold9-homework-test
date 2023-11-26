import { Post } from '@prisma/client';
import { ICreatePostInput } from './interface/post.interface.js';
import { PostService } from './post.service.js';

const postService = new PostService();
export const postResolver ={
  Query: {
    getPosts: (): Promise<Post[]> => {
      return postService.getPosts();
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