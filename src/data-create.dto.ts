import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class PersonCreateDto {
  @ApiProperty({ description: 'The name of the customer', required: true })
  @IsNotEmpty()
  @Length(3, 50)
  name: string;
  @ApiProperty({ description: 'The phone of the customer', required: true })
  @Length(3, 20)
  @IsNotEmpty()
  phone: string;
  @ApiProperty({ description: 'The location of the customer', required: true })
  @IsNotEmpty()
  @Length(3, 200)
  location: string;
}
