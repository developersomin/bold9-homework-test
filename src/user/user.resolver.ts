import { ICreateUserInput } from './interface/user.interface.js';
import { User } from '@prisma/client';
import { UserService } from './user.service.js';

const userService = new UserService();
export const userResolver ={
  Query: {
    getUsers: () => {
      return userService.getUsers();
    },
  },
  Mutation:{
    createUser: async (parent: any, { createUserInput }: {
      createUserInput: ICreateUserInput
    }):Promise<User> => {
      return  userService.createUser(createUserInput);
    },
  }
}