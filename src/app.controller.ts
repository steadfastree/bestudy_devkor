import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Req,
  Res,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

@Controller('/users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getUsers(@Res() res: Response) {
    // 모든 유저 가져오기
    try {
      const users = this.appService.getUsers();
      res.status(200).send(users); //OK
    } catch (error) {
      res.status(400).send(error.messages);
    }
  }

  @Get('/:index') //index 위치의 유저 가져오기
  getUsernameByIndex(@Param('index') index: number, @Res() res: Response) {
    try {
      const username = this.appService.getUsernameByIndex(index);
      res.status(200).send(username); //OK
    } catch (error) {
      res.status(400).send(error.messages);
    }
  }

  @Post('/:index') //index 위치에 새 유저 추가, usernames.length 이상을 지정하면 맨 뒤에 추가.
  createUser(
    @Param('index') index: number,
    @Body('username') username: string,
    @Res() res: Response,
  ) {
    try {
      this.appService.createUser(index, username);
      res.status(201).send('created successfully'); // created successfully
    } catch (error) {
      res.status(400).send(error.messages);
    }
  }

  @Delete('/:index') // index 위치의 유저 삭제하기
  deleteUserByIndex(@Param('index') index: number, @Res() res: Response) {
    try {
      this.appService.deleteUser(index);
      res.status(200).send('deleted successfully'); //deleted successfully
    } catch (error) {
      res.status(400).send(error.messages);
    }
  }
}
