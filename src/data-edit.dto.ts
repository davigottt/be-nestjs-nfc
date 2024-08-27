import { IsString } from 'class-validator';

export class PersonEditDto {
  @IsString()
  name: string;
  @IsString()
  phone: string;
  @IsString()
  location: string;
}
