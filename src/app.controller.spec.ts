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
import { DeleteResult } from 'typeorm';

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
      const result = {
        items: [
          {
            id: 2912,
            name: 'Kouba a Bečka a.s.',
            phone: '+420 961 351 958',
            location: 'Skuteč, U Velké Skály 40',
          },
          {
            id: 2913,
            name: 'Svačina a Straka a.s.',
            phone: '+420 914 548 161',
            location: 'Kroměříž, K Moravině 268',
          },
          {
            id: 2914,
            name: 'Medková v.o.s.',
            phone: '+420 766 226 236',
            location: 'Rudná, V Kole 348',
          },
          {
            id: 2915,
            name: 'Horák a Chudoba v.o.s.',
            phone: '+420 349 203 683',
            location: 'Krásná Hora nad Vltavou, Vraňanská 7',
          },
          {
            id: 2916,
            name: 'Bubeník a Kazda a.s.',
            phone: '+420 528 395 076',
            location: 'Uherský Ostroh, K Zadní Kopanině 9',
          },
        ],
        meta: {
          totalItems: 100,
          itemCount: 5,
          itemsPerPage: 5,
          totalPages: 20,
          currentPage: 2,
        },
      };

      jest.spyOn(dataService, 'getAll').mockImplementation(async () => result);

      expect(await appController.getAllCustomer(2, 5)).toBe(result);
    });
  });

  describe('create', () => {
    it('should return created customer', async () => {
      const input: Omit<Customer, 'id'> = {
        name: 'Dan Otočný',
        phone: '123456789',
        location: 'Praha',
      };

      const result = {
        ...input,
        id: 10,
      };

      jest
        .spyOn(appController, 'create')
        .mockImplementation(async () => result);

      const out = await appController.create(input);

      expect(out.name).toBe(input.name);
      expect(out.phone).toBe(input.phone);
      expect(out.location).toBe(input.location);
      expect(out.id).toBeDefined();
    });
  });

  describe('remove', () => {
    it('should not error', async () => {
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
