import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller('/users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  //parameter와 query로 url을 통해 데이터 전달.
  //get /users/:id -> parameter,
  @Get('/:index')
  getUsernameByIndex(@Param('index') index: number, @Res() res: Response) {
    try {
      const username = this.appService.getUsernameByIndex(index);
      res.send(username);
    } catch (error) {
      res.status(400).send(error.messages);
    }
  }
}
