import { IsEmail, IsNotEmpty } from 'class-validator';

export class PersonCreateDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  phone: string;
  @IsNotEmpty()
  location: string;
}
