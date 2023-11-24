import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Patch,
  Param,
  Delete,
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

@ApiTags('Feed')
@ApiOkResponse({ description: 'Ok' })
@ApiBadRequestResponse({ description: '잘못된 값 입력' })
@ApiUnauthorizedResponse({ description: '로그인 필요' })
//AuthGuard 삽입
@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @ApiOperation({
    summary: '게시글 작성',
    description: '제목과 내용을 입력하여 게시글 작성',
  })
  @ApiCreatedResponse({ description: '게시글 작성 성공' })
  @Post()
  async writeFeed(@Body() createFeedDto: CreateFeedDto) {
    return this.feedService.create(createFeedDto);
  }

  @Get()
  async findAll() {
    //리스트 get으로 수정
    return this.feedService.findAll();
  }
  @ApiOperation({
    summary: '게시글 상세 보기',
    description: '해당 id의 게시글 정보 확인',
  })
  @Get(':id')
  async getFeedDetail(@Param('id') id: string) {
    return this.feedService.findOne(+id); //+id는 string을 number로 변환한다는 의미
  }

  @ApiOperation({
    summary: '게시글 수정',
    description: '게시글 번호, 제목, 내용을 다시 입력하여 수정.',
  })
  @Put(':id')
  async updateFeed(
    @Param('id') id: string,
    @Body() updateFeedDto: UpdateFeedDto,
  ) {
    return this.feedService.update(+id, updateFeedDto);
  }

  @ApiOperation({
    summary: '게시글 삭제',
    description: '게시글 번호로 게시글 삭제',
  })
  @Delete(':id')
  async removeFeed(@Param('id') id: string) {
    return this.feedService.remove(+id);
  }
}
