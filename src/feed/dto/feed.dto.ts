import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FeedDto {
  /*@ApiProperty({ description: '작성 유저 고유 번호' }) -> req.user.id에서 확인 가능.
  @IsNumber()
  @IsNotEmpty()
  userId: number;*/

  @ApiProperty({ description: '게시글 제목' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: '게시글 내용' })
  @IsString()
  @IsNotEmpty()
  content: string;
}
