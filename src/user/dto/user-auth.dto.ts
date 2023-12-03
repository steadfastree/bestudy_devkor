import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: '아이디로 사용될 메일',
    example: 'anymail@anysite.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: '비밀번호',
    example: '1234!@',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: '이름', example: 'anyone' })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class LoginDto {
  @ApiProperty({ description: '이메일', example: 'anymail@anysite.com' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: '비밀번호',
    example: '1234!@',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
