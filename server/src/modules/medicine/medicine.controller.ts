import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { MedicineService } from './medicine.service';

@Controller('medicines')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @Get()
  findAll(@Query('userId') userId?: string) {
    return {
      code: 200,
      msg: 'success',
      data: this.medicineService.findAll(userId),
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return {
      code: 200,
      msg: 'success',
      data: this.medicineService.findOne(id),
    };
  }

  @Post()
  create(@Body() body: any) {
    return {
      code: 200,
      msg: 'success',
      data: this.medicineService.create(body),
    };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return {
      code: 200,
      msg: 'success',
      data: this.medicineService.update(id, body),
    };
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return {
      code: 200,
      msg: 'success',
      data: this.medicineService.delete(id),
    };
  }
}
