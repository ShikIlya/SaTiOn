import { IsEmail, IsLowercase, IsString } from 'class-validator';
import { LoginUserDto } from './LoginUser.dto';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  login: string;

  @IsString()
  password: string;
}
