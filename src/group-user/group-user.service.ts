import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateGroupUserDto } from './dto/create-group-user.dto';
import { UpdateGroupUserDto } from './dto/update-group-user.dto';

@Injectable()
export class GroupUserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createGroupUserDto: CreateGroupUserDto) {
    const groupUser = await this.prisma.groupUser.create({
      data: createGroupUserDto,
    });

    if (!groupUser) {
      throw new HttpException(
        'Grupo de usuário não pode ser gravada no banco de dados, falha na validação dos dados.',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return groupUser;
    }
  }

  async findAll() {
    const groupUser = await this.prisma.groupUser.findMany();

    if (groupUser.length === 0) {
      throw new HttpException('Não existem grupos cadastrados para listar.', HttpStatus.BAD_REQUEST,
      );
    } else {
      return groupUser.map((group) => ({
        ...group
      }));
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} groupUser`;
  }

  update(id: number, updateGroupUserDto: UpdateGroupUserDto) {
    return `This action updates a #${id} groupUser`;
  }

  async remove(id: number) {
    try {
      await this.prisma.groupUser.delete({
        where: { id },
      });

      return {
        message: 'Grupo de usuários removido com sucesso.',
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Grupo de usuários com o ID '${id}' não encontrado.`);
      } else {
        throw new HttpException('Erro ao remover grupo de usuários, falha na validação dos dados.', HttpStatus.BAD_REQUEST);
      }
    }
  }
}
