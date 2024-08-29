import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../data/data.entity';

export const TypeOrmSQLITETestingModule = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [Customer],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([Customer]),
];
