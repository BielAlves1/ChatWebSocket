import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupUserService } from './group-user.service';
import { CreateGroupUserDto } from './dto/create-group-user.dto';
import { UpdateGroupUserDto } from './dto/update-group-user.dto';

@Controller('group-user')
export class GroupUserController {
  constructor(private readonly groupUserService: GroupUserService) {}

  @Post('create')
  create(@Body() createGroupUserDto: CreateGroupUserDto) {
    return this.groupUserService.create(createGroupUserDto);
  }

  @Get()
  findAll() {
    return this.groupUserService.findAll();
  }

  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.groupUserService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateGroupUserDto: UpdateGroupUserDto) {
    return this.groupUserService.update(+id, updateGroupUserDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.groupUserService.remove(+id);
  }
}
