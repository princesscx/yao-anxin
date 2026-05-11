import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { RecordService } from './record.service';

@Controller('records')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Get()
  findAll(
    @Query('userId') userId?: string,
    @Query('date') date?: string,
  ) {
    return {
      code: 200,
      msg: 'success',
      data: this.recordService.findAll(userId, date),
    };
  }

  @Get('compliance')
  getComplianceRate(
    @Query('userId') userId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return {
      code: 200,
      msg: 'success',
      data: {
        rate: this.recordService.getComplianceRate(userId, startDate, endDate),
      },
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return {
      code: 200,
      msg: 'success',
      data: this.recordService.findOne(id),
    };
  }

  @Post()
  create(@Body() body: any) {
    return {
      code: 200,
      msg: 'success',
      data: this.recordService.create(body),
    };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return {
      code: 200,
      msg: 'success',
      data: this.recordService.update(id, body),
    };
  }

  @Put(':id/confirm')
  confirmTaken(
    @Param('id') id: string,
    @Body() body: { takenTime: string },
  ) {
    return {
      code: 200,
      msg: 'success',
      data: this.recordService.confirmTaken(id, body.takenTime),
    };
  }
}
