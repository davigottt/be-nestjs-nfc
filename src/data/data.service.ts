import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Customer } from './data.entity';

@Injectable()
export class DataService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async getAll(): Promise<Customer[]> {
    return await this.customerRepository.find();
  }

  /**
   * All properties are required.
   */
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

  async remove(id: number): Promise<DeleteResult> {
    return await this.customerRepository.delete({ id });
  }

  /** This is intented so you only need to pass the properties which you want to change.
   * The existing ones will stay the same.
   */
  async update(
    id: number,
    data: Partial<{ name: string; phone: string; location: string }>,
  ): Promise<Customer> {
    const customer = await this.customerRepository.findOneBy({ id });

    if (!customer) {
      throw new NotFoundException("Customer doesn't exist.");
    }

    /** Merge existing and new values. The new values have priority. */
    return await this.customerRepository.save({
      ...customer,
      ...data,
    });
  }

  async getOne(id: number): Promise<Customer> {
    /** Find customer by id. If it doesn't exist throw error. */
    const customer = await this.customerRepository.findOneBy({ id });

    if (!customer) {
      throw new NotFoundException("Customer doesn't exist.");
    }

    return customer;
  }
}
