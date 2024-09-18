import { IsEmail, IsString, IsNotEmpty, Length } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'O e-mail fornecido está no formato inválido.' })
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio.' })
  email: string;

  @IsString({ message: 'A senha deve ser uma string.' })
  @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
  @Length(8, 25, {
    message: 'Senha precisa ter no mínimo 8 caracteres e no máximo 25.',
  })
  password: string;
}
