import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [PrismaModule, UserModule, ProjectModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
