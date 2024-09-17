import { ConnectedSocket, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { MessageService } from 'src/message/message.service';

@WebSocketGateway({
  namespace: 'gateway-chat',
  cors: {
    origin: '*',
  },
})
export class GatewayChatGateway {
  constructor(
    private messageService: MessageService
  ){}

  @SubscribeMessage('message')
  handleMessage(@ConnectedSocket() client: Socket, data: string): string {
    return data;
  }
}
