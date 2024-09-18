import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GroupService } from 'src/group/group.service';
import { MessageService } from 'src/message/message.service';
import { CreateMessageDto } from 'src/message/dto/create-message.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(
    private readonly messageService: MessageService,
    private readonly groupService: GroupService,
  ) {}

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() payload: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const group = await this.groupService.findOne(payload.groupId);
    if (!group) {
      client.emit('errorMessage', 'O grupo não foi encontrado.');
      return;
    }

    const message = await this.messageService.create(payload);

    this.server.to(payload.groupId.toString()).emit('receiveMessage', message);

    return message;
  }

  @SubscribeMessage('joinGroup')
  async handleJoinGroup(
    @MessageBody() payload: { groupId: number },
    @ConnectedSocket() client: Socket,
  ) {
    const groupId = payload.groupId.toString();

    const group = await this.groupService.findOne(payload.groupId);
    if (!group) {
      client.emit('errorMessage', 'O grupo não foi encontrado.');
      return;
    }

    client.join(groupId);
    client.emit('joinedGroup', `Você entrou no grupo ${groupId}`);
  }
}
