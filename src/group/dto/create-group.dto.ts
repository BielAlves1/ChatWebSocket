import { Prisma } from '@prisma/client';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class CreateGroupDto {
  @IsOptional()
  @IsString({ message: 'Nome do grupo precisa ser uma string.' })
  @Length(1, 25, {
    message: 'Nome do grupo precisa ter pelo menos 1 caractere e no máximo 25',
  })
  name?: string;

  @IsBoolean({
    message: 'Este campo é um booleano, insira true ou false apenas.',
  })
  isPrivate?: boolean;

  @IsOptional()
  messages?: Prisma.MessageCreateNestedManyWithoutGroupInput;
  @IsOptional()
  groupUsers?: Prisma.GroupUserCreateNestedManyWithoutGroupInput;
}
