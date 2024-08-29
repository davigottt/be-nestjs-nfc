import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository } from 'typeorm';
import { Customer } from './data.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class DataService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  getAll(options: IPaginationOptions): Promise<Pagination<Customer>> {
    const queryBuilder = this.customerRepository.createQueryBuilder('c');
    return paginate<Customer>(queryBuilder, options);
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
  }): Promise<InsertResult> {
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
