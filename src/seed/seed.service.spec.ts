import { Test, TestingModule } from '@nestjs/testing';
import { SeedService } from './seed.service';
import { TypeOrmSQLITETestingModule } from '../utils/testing-typeorm';

describe('SeedService', () => {
  let service: SeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmSQLITETestingModule()],
      providers: [SeedService],
    }).compile();

    service = module.get<SeedService>(SeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
