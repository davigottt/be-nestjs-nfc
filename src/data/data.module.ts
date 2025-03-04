import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [DataService],
  exports: [DataService],
})
export class DataModule {}
