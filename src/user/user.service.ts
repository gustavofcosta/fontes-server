import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const userNameExist = await this.prisma.user.findUnique({
      where: { username: data.username },
    });

    if (userNameExist) {
      throw new BadRequestException('Erro interno', {
        cause: new Error(),
        description: 'username já esta cadastrado',
      });
    }

    const createUser = await this.prisma.user.create({ data });

    return {
      createUser,
    };
  }

  async findByUserName(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }
}
