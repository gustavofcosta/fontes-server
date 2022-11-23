import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { Project } from '../entities/project.entity';

export class CreateProjectDto extends Project {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  zip_code: number;

  @IsNotEmpty()
  @IsNumber()
  cost: number;

  @IsBoolean()
  done?: boolean;

  @IsNotEmpty()
  deadline: Date;
}
