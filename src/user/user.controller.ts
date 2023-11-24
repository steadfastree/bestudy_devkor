import { UserService } from './user.service';
import {
  Controller,
  Param,
  Get,
  Post,
  Body,
  Res,
  Req,
  UseGuards,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express'; //setheader 사용
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtPayloadDto } from 'src/dto/jwt.payload.dto';
import { LoginDto, RegisterDto } from 'src/dto/userauth.dto';
import { ApiOperation, ApiBody } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @ApiOperation({
    summary: '회원 가입',
    description: '회원 정보를 전송하여 회원가입 처리합니다.',
  })
  @ApiCreatedResponse({ description: '회원 가입 성공' })
  @ApiConflictResponse({ description: '이미 존재하는 아이디' })
  @ApiBody({ type: RegisterDto })
  async register(
    @Body() registerUser: RegisterDto, //에러 핸들링이 제대로 안됨.. dto로 타입 체크가 필요.
    @Res() res: Response,
  ) {
    try {
      res.status(201).json(await this.userService.register(registerUser));
    } catch (e) {
      res.json(e);
    }
  }
  @ApiOperation({
    summary: '로그인',
    description: '가입했던 정보로 로그인합니다.',
  })
  @ApiOkResponse({ description: '로그인 성공' })
  @ApiBadRequestResponse({ description: '잘못된 아이디나 비밀번호' })
  @ApiBody({ type: LoginDto })
  @Post('/login')
  async login(@Body() loginUser: LoginDto, @Res() res: Response) {
    try {
      res.status(200).json(await this.userService.login(loginUser));
    } catch (e) {
      res.json(e);
    }
  }
  //요청 헤더에 Authorization : Bearer + accessToken 넣어서 보낸다.

  @ApiOperation({
    summary: '프로필',
    description: '로그인한 유저의 정보',
  })
  @ApiOkResponse({ description: '인증 완료' })
  @ApiUnauthorizedResponse({ description: '로그인 필요' })
  @UseGuards(AuthGuard)
  @Get('/profile')
  async getProfile(@Req() req: Request, @Res() res: Response) {
    try {
      res.status(200).json(await this.userService.getProfile(req.user.id));
    } catch (e) {
      res.json(e);
    }
  }
}
