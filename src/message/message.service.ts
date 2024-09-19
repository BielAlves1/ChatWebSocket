import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMessageDto: CreateMessageDto) {
    const message = await this.prisma.message.create({
      data: {
        content: createMessageDto.content,
        senderId: createMessageDto.senderId,
        groupId: createMessageDto.groupId,
      },
    });

    if (!message) {
      throw new HttpException(
        'Mensagem não pode ser gravada no banco de dados, falha na validação dos dados.',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return message;
    }
  }

  async findAll() {
    const message = await this.prisma.message.findMany();

    if (message.length === 0) {
      throw new HttpException('Não existem mensagens salvas para listar.', HttpStatus.BAD_REQUEST,
      );
    } else {
      return message.map((message) => ({
        ...message
      }));
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  async remove(id: number) {
    try {
      await this.prisma.message.deleteMany({
        where: { id },
      });

      return {
        message: 'Mensagem removida com sucesso.',
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Mensagem com o ID '${id}' não encontrada.`);
      } else {
        throw new HttpException('Erro ao remover mensagem, falha na validação dos dados.', HttpStatus.BAD_REQUEST);
      }
    }
  }

  async removeAll() {
    await this.prisma.message.deleteMany()
    return 'Todos as mensagens foram removidas'
  }
}
