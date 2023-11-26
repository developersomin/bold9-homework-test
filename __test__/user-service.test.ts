import { describe } from 'node:test';
import { PrismaClient } from '@prisma/client';
import { UserService } from '../src/user/user.service.js';

describe('UserService',() =>{
  beforeAll(()=>{
    jest.mock('@prisma/client');
  })

  describe('getUserByEmail', async () => {
    it('이메일로 유저 찾기', () => {
      const mockPrisma = new PrismaClient();
      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValueOnce({
        id: 'dsadsa',
        name: 'test',
        email: 'test@naver.com',
      });
    });

    const userService = new UserService();
    const result = await userService.getUserByEmail('test@naver.com');

    expect(result).toEqual({
      id: 'dsadsa',
      name: 'test',
      email: 'test@naver.com',
    });
  });

  describe('getUserById',()=>{
    it('Id로 유저 찾기', () => {

    });
  })
  describe('createUser',()=>{
    it('사용자 생성', () => {

    });
  })
})

