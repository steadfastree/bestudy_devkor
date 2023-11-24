import { ApiProperty } from '@nestjs/swagger';
import { CreateFeedDto } from './create-feed.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateFeedDto extends CreateFeedDto {
  @ApiProperty({ description: '게시글 고유 번호' })
  @IsNumber()
  @IsNotEmpty()
  feedId: number;
}
