import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Entity,
} from 'typeorm';

@Entity()
export class Feed {
  @ApiProperty({ description: '게시글 고유 번호' })
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.feeds, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

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
  @Column({ default: 0 })
  views: number; //default 0

  @ApiProperty({ description: '게시글 작성 날짜' })
  @IsDate()
  @CreateDateColumn()
  createdAt: Date; //default 생성 시간
}
