import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PersonCreateDto {
  @ApiProperty({ description: 'The name of the customer', required: true })
  @IsNotEmpty()
  name: string;
  @ApiProperty({ description: 'The phone of the customer', required: true })
  @IsNotEmpty()
  phone: string;
  @ApiProperty({ description: 'The location of the customer', required: true })
  @IsNotEmpty()
  location: string;
}
