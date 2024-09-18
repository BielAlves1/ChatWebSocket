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

  async findOrCreatePrivateGroup(userId: number, groupId: number): Promise<Group> {
    let group = await this.findOne(groupId);
  
    if (!group) {
      group = await this.prisma.group.create({
        data: {
          isPrivate: true,
          groupUsers: {
            create: [
              { userId: userId },
              // Se você pretende adicionar dois usuários, deve adicionar outro grupoUser para `groupId`
              { userId: groupId },  
            ],
          },
        },
        include: {
          groupUsers: true,  // Inclui a relação groupUsers
        },
      });
    } else {
      // Adiciona o usuário ao grupo existente, se ainda não estiver presente
      const existingUser = group.groupUsers.find(user => user.userId === userId);
      if (!existingUser) {
        await this.prisma.groupUser.create({
          data: {
            userId,
            groupId,
          },
        });
        // Atualize o grupo para incluir a nova relação
        group = await this.findOne(groupId);
      }
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
      throw new HttpException('Não existem grupos cadastrados para listar.', HttpStatus.BAD_REQUEST,
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

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
