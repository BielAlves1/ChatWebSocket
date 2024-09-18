import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  remove(id: number) {
    return `This action removes a #${id} groupUser`;
  }
}
