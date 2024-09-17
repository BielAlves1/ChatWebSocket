import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { GatewayChatGateway } from 'src/gateway-chat/gateway-chat.gateway';

@Module({
  controllers: [MessageController],
  providers: [MessageService, GatewayChatGateway],
})
export class MessageModule {}
