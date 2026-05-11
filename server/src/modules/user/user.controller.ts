import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return {
      code: 200,
      msg: 'success',
      data: this.userService.findAll(),
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return {
      code: 200,
      msg: 'success',
      data: this.userService.findOne(id),
    };
  }

  @Post()
  create(@Body() body: any) {
    return {
      code: 200,
      msg: 'success',
      data: this.userService.create(body),
    };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return {
      code: 200,
      msg: 'success',
      data: this.userService.update(id, body),
    };
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return {
      code: 200,
      msg: 'success',
      data: this.userService.delete(id),
    };
  }
}
