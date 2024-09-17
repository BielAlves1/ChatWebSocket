import { IsNotEmpty, IsNumber } from "class-validator"

export class CreateGroupUserDto {
    @IsNumber({}, {message: 'O campo userId precisa ser um número(ID).'})
    @IsNotEmpty({message: 'O campo não pode estar vazio.'})
    userId: number

    @IsNumber({}, {message: 'O campo groupId precisa ser um número(ID).'})
    @IsNotEmpty({message: 'O campo não pode estar vazio.'})
    groupId: number
}
