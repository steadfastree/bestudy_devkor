import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Req,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FeedService } from './feed.service';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@ApiTags('Feed')
@ApiOkResponse({ description: 'Ok' })
@ApiBadRequestResponse({ description: '잘못된 값 입력' })
@ApiUnauthorizedResponse({ description: '로그인 필요' })
//AuthGuard 삽입
@UseGuards(AuthGuard)
@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @ApiOperation({
    summary: '게시글 작성',
    description: '제목과 내용을 입력하여 게시글 작성',
  })
  @ApiCreatedResponse({ description: '게시글 작성 성공' })
  @Post()
  async createFeed(@Req() req: Request, @Body() createFeedDto: CreateFeedDto) {
    return this.feedService.createFeed(req.user.id, createFeedDto);
  }

  @Get()
  async getFeedList(@Req() req: Request, @Query('page') page: number) {
    //리스트 get으로 수정
    return this.feedService.getFeedList(page);
  }

  @ApiOperation({
    summary: '게시글 상세 보기',
    description: '해당 id의 게시글 정보 확인',
  })
  @Get(':id')
  async getFeedDetail(@Req() req: Request, @Param('id') id: number) {
    return this.feedService.getFeedDetail(id); //+id는 string을 number로 변환한다는 의미
  }

  @ApiOperation({
    summary: '게시글 수정',
    description: '게시글 번호, 제목, 내용을 다시 입력하여 수정.',
  })
  @Put(':feedId')
  async updateFeed(
    @Req() req: Request,
    @Param('feedId') feedId: number,
    @Body() updateFeedDto: UpdateFeedDto,
  ) {
    return this.feedService.updateFeed(req.user.id, feedId, updateFeedDto);
  }

  @ApiOperation({
    summary: '게시글 삭제',
    description: '게시글 번호로 게시글 삭제',
  })
  @Delete(':feedId')
  async removeFeed(@Req() req: Request, @Param('feedId') feedId: number) {
    return this.feedService.removeFeed(req.user.id, feedId);
  }
}
