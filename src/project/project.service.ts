import { Injectable } from '@nestjs/common';
import { Prisma, Project } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    try {
      const data: Prisma.ProjectCreateInput = {
        ...createProjectDto,
      };

      const newProject = await this.prisma.project.create({
        data,
      });

      return { ...newProject };
    } catch (error) {
      {
        throw new NotFoundException(error.message);
      }
    }
  }

  async findAll(): Promise<Project[]> {
    try {
      return await this.prisma.project.findMany();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOne(id: string): Promise<Project> {
    try {
      if (!id) {
        throw new NotFoundException('this id does not exist');
      }

      const projectId = await this.prisma.project.findUnique({ where: { id } });

      return { ...projectId };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async put(id: string, updateProjectDto: UpdateProjectDto) {
    try {
      if (!id) {
        throw new NotFoundException('this id does not exist');
      }

      const projectId = await this.prisma.project.update({
        where: { id },
        data: updateProjectDto,
      });

      const { title, zip_code, cost, deadline } = projectId;

      return {
        title,
        zip_code,
        cost,
        deadline,
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async patch(id: string, updateProjectDto: UpdateProjectDto) {
    try {
      if (!id) {
        throw new NotFoundException('this id does not exist');
      }

      const editDone = await this.prisma.project.update({
        where: { id },
        data: updateProjectDto,
      });

      return {
        editDone,
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.project.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}

