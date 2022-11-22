import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BadRequestException } from '@nestjs/common/exceptions';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    const userNameExist = await this.prisma.user.findUnique({
      where: { username: createUserDto.username },
    });

    if (userNameExist) {
      throw new BadRequestException('Erro interno', {
        cause: new Error(),
        description: 'username já esta cadastrado',
      });
    }

    return await this.prisma.user.create({ data: createUserDto });
  }

  async findByUserName(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }
}
