import { ApiProperty } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdatePostDto extends CreatePostDto {
  @ApiProperty({ description: '게시글 고유 번호' })
  @IsNumber()
  @IsNotEmpty()
  postId: number;
}
