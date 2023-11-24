import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: '아이디로 사용될 메일',
    example: 'anymail@anysite.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: '비밀번호',
    example: '1234!@',
  })
  @IsString()
  password: string;

  @ApiProperty({ description: '이름', example: 'anyone' })
  @IsString()
  name: string;
}

export class LoginDto {
  @ApiProperty({ description: '이메일', example: 'anymail@anysite.com' })
  @IsString()
  email: string;

  @ApiProperty({
    description: '비밀번호',
    example: '1234!@',
  })
  @IsString()
  password: string;
}
