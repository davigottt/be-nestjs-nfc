import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataModule } from './data/data.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './data/data.entity';

@Module({
  imports: [
    DataModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      synchronize: true,
      entities: [Customer],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
