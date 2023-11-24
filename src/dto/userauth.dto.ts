import { IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;
}

export class LoginDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
