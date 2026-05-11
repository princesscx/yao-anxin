import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  findAll(@Query('userId') userId?: string) {
    return {
      code: 200,
      msg: 'success',
      data: this.messageService.findAll(userId),
    };
  }

  @Get('unread')
  findUnread(@Query('userId') userId: string) {
    return {
      code: 200,
      msg: 'success',
      data: this.messageService.findUnread(userId),
    };
  }

  @Get('unread-count')
  getUnreadCount(@Query('userId') userId: string) {
    return {
      code: 200,
      msg: 'success',
      data: {
        count: this.messageService.getUnreadCount(userId),
      },
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return {
      code: 200,
      msg: 'success',
      data: this.messageService.findOne(id),
    };
  }

  @Post()
  create(@Body() body: any) {
    return {
      code: 200,
      msg: 'success',
      data: this.messageService.create(body),
    };
  }

  @Put(':id/read')
  markAsRead(@Param('id') id: string) {
    return {
      code: 200,
      msg: 'success',
      data: this.messageService.markAsRead(id),
    };
  }

  @Put('read-all')
  markAllAsRead(@Query('userId') userId: string) {
    return {
      code: 200,
      msg: 'success',
      data: this.messageService.markAllAsRead(userId),
    };
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return {
      code: 200,
      msg: 'success',
      data: this.messageService.delete(id),
    };
  }
}
