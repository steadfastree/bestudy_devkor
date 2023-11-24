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
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Post')
@ApiOkResponse({ description: 'Ok' })
@ApiBadRequestResponse({ description: '잘못된 값 입력' })
@ApiUnauthorizedResponse({ description: '로그인 필요' })
//AuthGuard 삽입
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({
    summary: '게시글 작성',
    description: '제목과 내용을 입력하여 게시글 작성',
  })
  @ApiCreatedResponse({ description: '게시글 작성 성공' })
  @Post()
  async writePost(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  async findAll() {
    //리스트 get으로 수정
    return this.postService.findAll();
  }
  @ApiOperation({
    summary: '게시글 상세 보기',
    description: '해당 id의 게시글 정보 확인',
  })
  @Get(':id')
  async getPostDetail(@Param('id') id: string) {
    return this.postService.findOne(+id); //+id는 string을 number로 변환한다는 의미
  }

  @ApiOperation({
    summary: '게시글 수정',
    description: '게시글 번호, 제목, 내용을 다시 입력하여 수정.',
  })
  @Put(':id')
  async updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.update(+id, updatePostDto);
  }

  @ApiOperation({
    summary: '게시글 삭제',
    description: '게시글 번호로 게시글 삭제',
  })
  @Delete(':id')
  async removePost(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
