import { Prisma } from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString({ message: 'O nome de usuário deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome de usuário não pode estar vazio.' })
  @Length(5, 25, {
    message:
      'Nome de usuário deve conter pelo menos 5 caracteres e no máximo 25.',
  })
  @Matches(/^[a-zA-Z0-9_@]+$/, {
    message:
      'Nome de usuário deve conter apenas letras, números e sublinhados.',
  })
  @Transform(({ value }) => `@${value.replace(/^@/, '')}`)
  username: string;

  @IsEmail({}, { message: 'O e-mail fornecido está em um formato inválido.' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório e não pode estar vazio.' })
  email: string;

  @IsString({ message: 'A senha deve ser uma string.' })
  @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
  @Length(8, 25, {
    message: 'Senha precisa ter no mínimo 8 caracteres e no máximo 25.',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca!',
  })
  password: string;

  @IsUrl({}, { message: 'A URL deve ser uma string.' })
  @IsOptional()
  avatarUrl?: string;

  @IsOptional()
  messages?: Prisma.MessageCreateNestedManyWithoutSenderInput;

  @IsOptional()
  groups?: Prisma.GroupUserCreateNestedManyWithoutUserInput;
}
