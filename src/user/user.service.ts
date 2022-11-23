import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const data: Prisma.UserCreateInput = {
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 10),
      };

      const usernameExist = await this.prisma.user.findUnique({
        where: { username: createUserDto.username },
      });

      if (usernameExist) {
        throw new NotFoundException('already registered username');
      }

      const createUser = await this.prisma.user.create({ data });

      return {
        ...createUser,
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findByUserName(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }
}
