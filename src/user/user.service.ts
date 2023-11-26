import { ICreateUserInput } from './interface/user.interface.js';
import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient()
export class UserService{
  getUserByEmail(email:string):Promise<User|null>{
    return prisma.user.findUnique({
      where:{
        email
      }
    })
  }
  getUserById(authorId:string):Promise<User|null>{
    return prisma.user.findUnique({
      where: {
        id: authorId,
      },
    });
  }
  getUsers():Promise<User[]>{
    return prisma.user.findMany();
  }

  async createUser(createUserInput:ICreateUserInput):Promise<User>{
    const { name, password, email } = createUserInput;
    const user = await this.getUserByEmail(email);
    if(user){
      throw new Error("중복된 email 이 있습니다.")
    }
    return prisma.user.create({
      data:{
        name,
        password,
        email
      }
    });
  }
}