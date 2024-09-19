import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from '@prisma/client';

@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createGroupDto: CreateGroupDto) {
    const group = await this.prisma.group.create({
      data: { ...createGroupDto },
    });

    if (!group) {
      throw new HttpException(
        'Grupo não pode ser gravada no banco de dados, falha na validação dos dados.',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return group;
    }
  }

  async findOrCreatePrivateGroup(senderId: number, receiverId: number) {
    let group = await this.prisma.group.findFirst({
      where: {
        isPrivate: true,
        groupUsers: {
          every: {
            userId: {
              in: [senderId, receiverId],
            },
          },
        },
      },
    });

    if (!group) {
      group = await this.prisma.group.create({
        data: {
          isPrivate: true,
          groupUsers: {
            create: [{ userId: senderId }, { userId: receiverId }],
          },
        },
      });
    }

    return group;
  }

  async findOne(groupId: number): Promise<Group | null> {
    return this.prisma.group.findUnique({
      where: { id: groupId },
      include: { groupUsers: true },
    });
  }

  async findAll() {
    const group = await this.prisma.group.findMany();

    if (group.length === 0) {
      throw new HttpException(
        'Não existem grupos cadastrados para listar.',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return group.map((group) => ({
        ...group,
      }));
    }
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  async remove(id: number) {
    try {
      await this.prisma.group.delete({
        where: { id },
      });

      return {
        message: 'Grupo removido com sucesso.',
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Grupo com o ID '${id}' não encontrado.`);
      } else {
        throw new HttpException('Erro ao remover grupo, falha na validação dos dados.', HttpStatus.BAD_REQUEST);
      }
    }
  }
}
