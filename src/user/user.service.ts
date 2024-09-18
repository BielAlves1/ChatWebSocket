import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

//teste

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 10),
      },
    });

    if (!user) {
      throw new HttpException('Erro ao criar usuário, falha na validação dos dados.', HttpStatus.BAD_REQUEST);
    } else {
      return {
        ...user,
        password: undefined,
      };
    }
  }

  async findAll() {
    const users = await this.prisma.user.findMany();

    if (users.length === 0) {
      throw new HttpException('Não existem usuários cadastrados para listar.', HttpStatus.BAD_REQUEST,
      );
    } else {
      return users.map((user) => ({
        ...user,
        password: undefined,
      }));
    }
  }

  
  
  async findUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    
    if (!user) {
      throw new NotFoundException('Erro: Usuário não encontrado.');
    } else {
      return {
        ...user,
        password: undefined,
      };
    }
  }
  
  async findUserName(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException('Erro: Usuário não encontrado.');
    } else {
      return user;
    }
  }

  async findEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('Erro: Usuário não encontrado.');
    } else {
      return user;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const userData: any = { ...updateUserDto };
    
    if (userData.password) {
      userData.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    
    try {
      const user = await this.prisma.user.update({
        where: {
          id,
        },
        data: userData,
      });

      return user;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Usuário '${userData.username}' com ID(${id}) não encontrado.`);
      } else {
        throw new HttpException(
          'Erro ao alterar dados do usuário, falha na validação dos dados.',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.user.delete({
        where: { id },
      });

      return {
        message: 'Usuário removido com sucesso.',
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Usuário com o ID '${id}' não encontrado.`);
      } else {
        throw new HttpException('Erro ao remover usuário, falha na validação dos dados.', HttpStatus.BAD_REQUEST);
      }
    }
  }
}
