import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataService } from './data/data.service';
import { Customer } from './data/data.entity';
import { DataModule } from './data/data.module';
import { ConfigModule } from '@nestjs/config';
/** Tests won't pass with this for some reason. Needs import * as Joi from 'joi' */
//import Joi from 'joi';
import * as Joi from 'joi';
import { SeedModule } from './seed/seed.module';
import { TypeOrmSQLITETestingModule } from './utils/testing-typeorm';
import { DeleteResult, InsertResult } from 'typeorm';

describe('AppController', () => {
  let appController: AppController;
  let dataService: DataService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        DataModule,
        ...TypeOrmSQLITETestingModule(),
        ConfigModule.forRoot({
          validationSchema: Joi.object({
            PORT: Joi.number().port().default(3000),
            SEED_DATA: Joi.boolean().default(false),
            SEED_AMOUNT: Joi.number().default(100),
          }),
        }),
        SeedModule,
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    dataService = app.get<DataService>(DataService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('findAll', () => {
    it('should return an array of customers', async () => {
      const result: Customer[] = [
        { id: 0, name: 'x', phone: '', location: '' },
      ];

      jest.spyOn(dataService, 'getAll').mockImplementation(async () => result);

      expect(await appController.getAllCustomer()).toBe(result);
    });
  });

  describe('create', () => {
    it('should return created customer', async () => {
      const input: Customer = {
        id: 0,
        name: 'Dan Otočný',
        phone: '123456789',
        location: 'Praha',
      };
      const result: InsertResult = {
        generatedMaps: [{ id: 1 }],
        identifiers: [{ id: 1 }],
        raw: 1,
      };

      jest.spyOn(dataService, 'create').mockImplementation(async () => result);

      const out = await appController.create(input);

      expect(out.raw).toBe(1);
    });
  });

  describe('remove', () => {
    it('should remove the customer', async () => {
      const input = 0;
      const result: DeleteResult = {
        affected: 1,
        raw: 1,
      };

      jest.spyOn(dataService, 'remove').mockImplementation(async () => result);

      await appController.delete(input);
    });
  });

  describe('update', () => {
    it('should update the customer', async () => {
      const input = { name: 'Peter Peterson', id: 10 };
      const result = {
        name: 'Peter Peterson',
        phone: '123456789',
        location: 'Prague',
        id: 10,
      };

      jest.spyOn(dataService, 'update').mockImplementation(async () => result);

      //@ts-expect-error typescript is wrong here, it doesn't need all of the properties
      const out = await appController.update(input, input.id);
      expect(out.name).toBe(input.name);
    });
  });

  describe('getOne', () => {
    it('should get one customer', async () => {
      const result = {
        name: 'Peter Peterson',
        phone: '123456789',
        location: 'Prague',
        id: 10,
      };

      jest.spyOn(dataService, 'getOne').mockImplementation(async () => result);

      const out = await appController.getOne(result.id);

      expect(out).toBe(result);
    });
  });
});
