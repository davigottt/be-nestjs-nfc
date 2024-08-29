import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { AppService } from './app.service';
import { DataService } from './data/data.service';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { PersonCreateDto } from './data-create.dto';
import { PersonEditDto } from './data-edit.dto';
import { Customer } from './data/data.entity';
import { InsertResult } from 'typeorm';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly dataService: DataService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('customers')
  getAllCustomer(): Promise<Customer[]> {
    return this.dataService.getAll();
  }

  @Post('customers')
  create(@Body() data: PersonCreateDto): Promise<InsertResult> {
    return this.dataService.create({
      name: data.name,
      phone: data.phone,
      location: data.location,
    });
  }

  @Delete('customers/:id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.dataService.remove(id);
  }

  @Patch('customers/:id')
  async update(
    @Body() data: PersonEditDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Customer> {
    return await this.dataService.update(id, data);
  }

  @Get('customers/:id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<Customer> {
    return await this.dataService.getOne(id);
  }
}
