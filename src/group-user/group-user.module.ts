import { Module } from '@nestjs/common';
import { GroupUserService } from './group-user.service';
import { GroupUserController } from './group-user.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [GroupUserController],
  providers: [GroupUserService, PrismaService],
  exports: [GroupUserService]
})
export class GroupUserModule {}
