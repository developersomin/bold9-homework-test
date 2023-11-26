import { faker } from '@faker-js/faker';
import { Comment, Post, PrismaClient, User } from '@prisma/client';
export const prisma = new PrismaClient()
async function main(){
  for (let i = 0; i < 10; i++) {
    const user = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
    const createdUser:User = await prisma.user.create({ data: user });
    const authorId = createdUser.id;
    for(let j=0; j<8; j++){
      const content = Math.random() < 0.5 ? faker.lorem.word() : 'graphql';
      const isPublished = Math.random() < 0.5;
      const post = {
        title: faker.lorem.word(),
        content,
        isPublished,
        authorId,
      }
      const createdPost:Post = await prisma.post.create({ data: post });
      const postId = createdPost.id;
      for (let z = 0; z < 10; z++) {
        const comment = {
          content: faker.lorem.word(),
          postId,
        }
        const createdComment: Comment = await prisma.comment.create({ data: comment });
      }
    }
  }
}

main()
  .catch(e => {
    throw new Error('seed 중 오류');
  })
  .finally(async () => {
    await prisma.$disconnect();
  });