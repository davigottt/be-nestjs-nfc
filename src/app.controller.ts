import {
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { DataService } from './data/data.service';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { PersonCreateDto } from './data-create.dto';
import { PersonEditDto } from './data-edit.dto';
import { Customer } from './data/data.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

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
  async getAllCustomer(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<Customer>> {
    limit = limit > 100 ? 100 : limit;
    return await this.dataService.getAll({ page, limit });
  }

  @Post('customers')
  async create(
    @Body() data: PersonCreateDto,
  ): Promise<PersonCreateDto & { id: number }> {
    const out = await this.dataService.create({
      name: data.name,
      phone: data.phone,
      location: data.location,
    });

    return { ...data, id: out.identifiers[0].id };
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
