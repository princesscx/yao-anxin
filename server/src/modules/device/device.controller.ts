import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { DeviceService } from './device.service';

@Controller('devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get()
  findAll(@Query('userId') userId?: string) {
    return {
      code: 200,
      msg: 'success',
      data: this.deviceService.findAll(userId),
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return {
      code: 200,
      msg: 'success',
      data: this.deviceService.findOne(id),
    };
  }

  @Post()
  create(@Body() body: any) {
    return {
      code: 200,
      msg: 'success',
      data: this.deviceService.create(body),
    };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return {
      code: 200,
      msg: 'success',
      data: this.deviceService.update(id, body),
    };
  }

  @Put(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() body: { status: 'online' | 'offline'; signal?: 'strong' | 'medium' | 'weak'; battery?: number },
  ) {
    return {
      code: 200,
      msg: 'success',
      data: this.deviceService.updateStatus(id, body.status, body.signal, body.battery),
    };
  }

  @Post(':id/restart')
  restart(@Param('id') id: string) {
    return {
      code: 200,
      msg: 'success',
      data: this.deviceService.restart(id),
    };
  }

  @Delete(':id')
  unbind(@Param('id') id: string) {
    return {
      code: 200,
      msg: 'success',
      data: this.deviceService.unbind(id),
    };
  }
}
