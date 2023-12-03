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
import { FeedDto } from './dto/feed.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
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
@ApiBearerAuth('accessToken')
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
  async createFeed(@Req() req: Request, @Body() feedDto: FeedDto) {
    try {
      console.log(req.user.id);
      return this.feedService.createFeed(req.user.id, feedDto);
    } catch (e) {
      return { status: e.HttpStatus, message: e.message };
    }
  }

  @ApiOperation({ summary: '게시글 목록 조회' })
  @Get()
  async getFeedList(@Req() req: Request, @Query('page') page: number = 1) {
    //리스트 get으로 수정
    try {
      return this.feedService.getFeedList(page);
    } catch (e) {
      return { status: e.HttpStatus, message: e.message };
    }
  }

  @ApiOperation({
    // 요청할때마다 게시글 view increasing 필요
    summary: '게시글 상세 보기',
    description: '해당 id의 게시글 정보 확인',
  })
  @Get(':feedId')
  async getFeedDetail(@Req() req: Request, @Param('feedId') feedId: number) {
    try {
      return this.feedService.getFeedDetail(feedId);
    } catch (e) {
      return { status: e.HttpStatus, message: e.message };
    }
  }

  @ApiOperation({
    summary: '게시글 수정',
    description: '게시글 번호, 제목, 내용을 다시 입력하여 수정.',
  })
  @Put(':feedId')
  async updateFeed(
    @Req() req: Request,
    @Param('feedId') feedId: number,
    @Body() feedDto: FeedDto,
  ) {
    try {
      return this.feedService.updateFeed(req.user.id, feedId, feedDto);
    } catch (e) {
      return { status: e.HttpStatus, message: e.message };
    }
  }

  @ApiOperation({
    summary: '게시글 삭제',
    description: '게시글 번호로 게시글 삭제',
  })
  @Delete(':feedId')
  async removeFeed(@Req() req: Request, @Param('feedId') feedId: number) {
    try {
      return this.feedService.removeFeed(req.user.id, feedId);
    } catch (e) {
      return { status: e.HttpStatus, message: e.message };
    }
  }
}
