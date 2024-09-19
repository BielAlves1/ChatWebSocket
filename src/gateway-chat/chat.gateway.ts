import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayDisconnect,
  OnGatewayConnection,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GroupService } from 'src/group/group.service';
import { MessageService } from 'src/message/message.service';
import { CreateMessageDto } from 'src/message/dto/create-message.dto';

@WebSocketGateway(3001, {
  cors: {
    origin: '*',
  },
  namespace: 'chat',
})
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private userSockets: Map<number, Set<Socket>> = new Map();

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  handleConnection(client: Socket) {
    console.log('Client connected', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected', client.id);
    for (const [userId, sockets] of this.userSockets.entries()) {
      sockets.delete(client);
      if (sockets.size === 0) {
        this.userSockets.delete(userId);
      }
    }
  }

  constructor(
    private readonly messageService: MessageService,
    private readonly groupService: GroupService,
  ) {}

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() payload: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const group = await this.groupService.findOrCreatePrivateGroup(
        payload.senderId,
        payload.receiverId,
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

      const groupId = group.id.toString();

      client.join(groupId);
      client.emit('joinedGroup', `Você entrou no grupo ${groupId}`);

      const receiverSockets = this.userSockets.get(payload.receiverId) || new Set();
      receiverSockets.forEach(socket => {
        socket.join(groupId);
        socket.emit('joinedGroup', `Você entrou no grupo ${groupId}`);
      });
      
      this.server.to(groupId).emit('receiveMessage', message);
      
      return message;
    } catch (error) {
      client.emit('errorMessage', 'Ocorreu um erro ao processar a mensagem.');
      console.error('Error handling message:', error);
    }
  }
}