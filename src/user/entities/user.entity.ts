import { Project } from 'src/project/entities/project.entity';

export class User {
  id?: string;
  name: string;
  password: string;
  username: string;
  projects?: Project[];
}

