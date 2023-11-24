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

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  getHello(): string {
    return this.appService.getHello();
  }
}
