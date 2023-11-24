import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class Feed {
  @ApiProperty({ description: '게시글 고유 번호' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '작성 유저 고유 번호' })
  @IsNumber()
  @IsNotEmpty()
  @Column()
  userId: number; //request에서

  @ApiProperty({ description: '게시글 제목' })
  @IsString()
  @IsNotEmpty()
  @Column()
  title: string;

  @ApiProperty({ description: '게시글 내용' })
  @IsString()
  @IsNotEmpty()
  @Column()
  content: string;

  @ApiProperty({ description: '게시글 조회 수' })
  @IsNumber()
  @Column()
  views: number = 0; //default 0

  @ApiProperty({ description: '게시글 작성 날짜' })
  @IsDate()
  @CreateDateColumn()
  createdAt: Date; //default 생성 시간
}
