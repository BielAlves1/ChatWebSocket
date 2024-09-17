import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { GatewayChatGateway } from 'src/gateway-chat/gateway-chat.gateway';

@Module({
  controllers: [UserController],
  providers: [UserService, GatewayChatGateway],
})
export class UserModule {}
