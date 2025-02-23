import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsUnique } from '../../common/validators/is-email-unique';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @IsUnique({ table: 'tuser', field: 'email' })
  email: string;

  @IsString()
  name: string;
}
