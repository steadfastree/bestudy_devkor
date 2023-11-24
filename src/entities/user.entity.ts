import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({ description: '회원의 고유 번호' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '회원 이름' })
  @Column()
  name: string;

  @ApiProperty({ description: '회원 이메일' })
  @Index()
  @Column()
  email: string;

  @ApiProperty({ description: '회원의 암호화된 비밀번호' })
  @Column()
  password: string;
}
