import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
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
export class MessageGateway {
  @WebSocketServer() server: Server;

  constructor(
    private readonly messageService: MessageService,
    private readonly groupService: GroupService,
  ) {}

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() payload: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const group = await this.groupService.findOrCreatePrivateGroup(
      payload.senderId,
      payload.groupId,
    );

    if (!group) {
      client.emit(
        'errorMessage',
        'Não foi possível criar o grupo privado, falha na validação dos dados.',
      );
      return;
    }

    const message = await this.messageService.create({
      ...payload,
      groupId: group.id,
    });

    this.server.to(group.id.toString()).emit('receiveMessage', message);

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
