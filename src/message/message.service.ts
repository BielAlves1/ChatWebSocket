import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMessageDto: CreateMessageDto) {
    const message = await this.prisma.message.create({
      data: { ...createMessageDto },
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

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
