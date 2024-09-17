import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';
import { UserModule } from './user/user.module';
import { GatewayChatGateway } from './gateway-chat/gateway-chat.gateway';
import { GroupUserModule } from './group-user/group-user.module';
import { GroupModule } from './group/group.module';
import { MessageModule } from './message/message.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, MessageModule, GroupModule, GroupUserModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, GatewayChatGateway],
})
export class AppModule {}
