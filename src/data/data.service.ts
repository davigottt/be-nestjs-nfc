import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './data.entity';

@Injectable()
export class DataService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async getAll() {
    return await this.customerRepository.find();
  }

  async create({
    name,
    phone,
    location,
  }: {
    name: string;
    phone: string;
    location: string;
  }) {
    return await this.customerRepository.insert({ name, phone, location });
  }

  async remove(id: number) {
    return await this.customerRepository.delete({ id });
  }

  async update(
    id: number,
    data: Partial<{ name: string; phone: string; location: string }>,
  ) {
    const customer = await this.customerRepository.findOneBy({ id });

    if (!customer) {
      throw new NotFoundException("Customer doesn't exist.");
    }

    return await this.customerRepository.save({
      ...customer,
      ...data,
    });
  }

  async getOne(id: number) {
    const customer = await this.customerRepository.findOneBy({ id });

    if (!customer) {
      throw new NotFoundException("Customer doesn't exist.");
    }

    return customer;
  }
}
