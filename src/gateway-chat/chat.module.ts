import { Module } from '@nestjs/common';
import { MessageGateway } from './chat.gateway';
import { GroupModule } from 'src/group/group.module';
import { MessageModule } from 'src/message/message.module';

@Module({
  imports: [GroupModule, MessageModule],
  providers: [MessageGateway],
  exports: [MessageGateway],
})
export class GatewayChatModule {}
