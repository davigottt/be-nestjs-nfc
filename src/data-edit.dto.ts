import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPhoneNumber, IsString, Length } from 'class-validator';

/** This is intented so you only need to pass the properties which you want to change.
 * The existing ones will stay the same.
 */
export class PersonEditDto {
  @ApiProperty({ description: 'The name of the customer', required: false })
  @IsString()
  @Length(3, 50)
  @IsOptional()
  name: string;
  @ApiProperty({ description: 'The phone of the customer', required: false })
  @IsPhoneNumber()
  @IsOptional()
  phone: string;
  @ApiProperty({ description: 'The location of the customer', required: false })
  @IsString()
  @IsOptional()
  @Length(3, 200)
  location: string;
}
