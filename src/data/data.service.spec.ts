import { Test, TestingModule } from '@nestjs/testing';
import { DataService } from './data.service';
import { TypeOrmSQLITETestingModule } from '../utils/testing-typeorm';

describe('DataService', () => {
  let service: DataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmSQLITETestingModule()],
      providers: [DataService],
      exports: [DataService],
    }).compile();

    service = module.get<DataService>(DataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
