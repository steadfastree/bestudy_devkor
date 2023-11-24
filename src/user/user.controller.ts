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
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express'; //setheader 사용
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtPayloadDto } from 'src/dto/jwt.payload.dto';
import { LoginDto, RegisterDto } from 'src/dto/userauth.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
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

  @Post('/login')
  async login(@Body() loginUser: LoginDto, @Res() res: Response) {
    try {
      res.status(200).json(await this.userService.login(loginUser));
    } catch (e) {
      res.json(e);
    }
  }
  //요청 헤더에 Authorization : Bearer + accessToken 넣어서 보낸다.

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
