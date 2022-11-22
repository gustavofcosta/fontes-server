import { Project } from '../entities/project.entity';

export class CreateProjectDto extends Project {
  title: string;
  zip_code: string;
  cost: string;
  done: false;
  deadline: Date;
  created_at: Date;
  update_at: Date;
  username: string;
  authorId: string;
}
