import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common/exceptions';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const userNameExist = await this.prisma.user.findUnique({
      where: { username: createUserDto.username },
    });

    if (userNameExist) {
      throw new BadRequestException('Erro interno', {
        cause: new Error(),
        description: 'username já esta cadastrado',
      });
    }

    const createUser = await this.prisma.user.create({ data });

    return {
      ...createUser,
    };
  }

  async findByUserName(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }
}
