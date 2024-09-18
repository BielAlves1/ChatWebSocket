import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('find-username/:username')
  findUserName(@Param('username') username: string) {
    return this.userService.findUserName(username);
  }

  @Get('find-email/:email')
  findEmail(@Param('email') email: string) {
    return this.userService.findUserName(email);
  }

  @Get('find/:id')
  findUser(@Param('id') id: string) {
    return this.userService.findUser(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
