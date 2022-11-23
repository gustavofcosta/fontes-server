import { Project } from '../entities/project.entity';

export class CreateProjectDto extends Project {
  title: string;
  zip_code: string;
  cost: string;
  done?: boolean;
  deadline?: Date;
  username?: string;
  authorId?: string;
}
