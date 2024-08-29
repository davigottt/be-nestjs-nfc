import { Injectable } from '@nestjs/common';
import { Faker, cs_CZ } from '@faker-js/faker';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../data/data.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async seedData(amount: number) {
    const faker = new Faker({
      locale: [cs_CZ],
    });

    console.log('Seeding data');

    const customers: { name: string; phone: string; location: string }[] = [];

    // Fills an array with fake customers based on the specified amount
    for (let i = 0; i < amount; i++) {
      const customer = {
        name: faker.company.name(),
        //phone: faker.phone.number('+420 ### ### ###'),
        phone: `+420 ${faker.string.numeric(3)} ${faker.string.numeric(3)} ${faker.string.numeric(3)}`,
        location: `${faker.location.city()}, ${faker.location.streetAddress()}`,
      };
      customers.push(customer);
    }

    // Delete all existing data from database before injecting generated one
    await this.customerRepository.delete({});

    // Mass insert customers
    await this.customerRepository.insert(customers);
  }
}
