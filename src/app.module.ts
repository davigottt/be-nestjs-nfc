import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataModule } from './data/data.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './data/data.entity';
import { ConfigModule } from '@nestjs/config';
import { SeedModule } from './seed/seed.module';
import * as Joi from 'joi';

@Module({
  imports: [
    DataModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      synchronize: true,
      entities: [Customer],
    }),
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
})
export class AppModule {}
