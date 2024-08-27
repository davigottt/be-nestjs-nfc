import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/data/data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [SeedService],
})
export class SeedModule {}
