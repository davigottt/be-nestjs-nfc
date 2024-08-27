import { Injectable } from '@nestjs/common';
import { Faker, cs_CZ } from '@faker-js/faker';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/data/data.entity';
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

    for (let i = 0; i < amount; i++) {
      const customer = {
        name: faker.company.name(),
        phone: faker.phone.number('+420 ### ### ###'),
        location: `${faker.location.city()}, ${faker.location.streetAddress()}`,
      };
      customers.push(customer);
    }

    await this.customerRepository.delete({});

    await this.customerRepository.insert(customers);
  }
}
