import { Post } from '@prisma/client';
import { ICreatePostInput } from './interface/post.interface.js';
import { PostService } from './post.service.js';
import { UserService } from '../user/user.service.js';

const userService = new UserService();
const postService = new PostService(userService);
export const postResolver = {
  Query: {
    getPosts: (_: any, { userId }: { userId: string }): Promise<Post[]> => {
      return postService.getPosts(userId);
    },
  },
  Mutation: {
    createPost: async (
      parent: any,
      {
        createPostInput,
      }: {
        createPostInput: ICreatePostInput;
      },
    ): Promise<Post> => {
      return postService.createPost(createPostInput);
    },
  },
};
