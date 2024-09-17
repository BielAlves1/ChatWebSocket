import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
} from 'class-validator';

export class CreateMessageDto {
  @IsString({ message: 'O conteúdo da mensagem precisa ser uma string.' })
  @IsNotEmpty({ message: 'O conteúdo da mensagem não pode estar vazio.' })
  @Max(1000, {
    message: 'Tamanho máximo do conteúdo da menasgem é de 1000 caracteres.',
  })
  content: string;

  @IsOptional()
  createdAt?: string | Date;

  @IsNumber(
    {},
    { message: 'O campo remetente/usuário precisa ser um número(ID)' },
  )
  senderId: number;

  @IsNumber({}, { message: 'O campo grupo precisa ser um número(ID)' })
  groupId: number;
}
