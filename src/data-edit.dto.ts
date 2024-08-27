import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/** This is intented so you only need to pass the properties which you want to change.
 * The existing ones will stay the same.
 */
export class PersonEditDto {
  @ApiProperty({ description: 'The name of the customer', required: false })
  @IsString()
  name: string;
  @ApiProperty({ description: 'The phone of the customer', required: false })
  @IsString()
  phone: string;
  @ApiProperty({ description: 'The location of the customer', required: false })
  @IsString()
  location: string;
}
