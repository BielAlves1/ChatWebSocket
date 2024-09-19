import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MessageGateway } from './gateway-chat/chat.gateway';
import { GroupUserModule } from './group-user/group-user.module';
import { GroupModule } from './group/group.module';
import { MessageModule } from './message/message.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { GatewayChatModule } from './gateway-chat/chat.module';

@Module({
  imports: [
    UserModule,
    MessageModule,
    GroupModule,
    GroupUserModule,
    AuthModule,
    GatewayChatModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    MessageGateway,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
