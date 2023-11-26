import * as bcrypt from 'bcryptjs';
import { ICreateUserInput } from './interface/user.interface.js';
import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient()
export class UserService{
  getUser(email:string){
    return prisma.user.findFirst({
      where:{
        email
      }
    })
  }
  getUsers():Promise<User[]>{
    return prisma.user.findMany();
  }

  async createUser(createUserInput:ICreateUserInput){
    const user = await this.getUser(createUserInput.email);
    if(user){
      throw new Error("중복된 email 이 있습니다.")
    }
    return prisma.user.create({
      data:{
        name: createUserInput.name,
        password: createUserInput.password,
        email: createUserInput.email,
      }
    });
  }
}