import { UserService } from './user.service';
import { Controller, Param, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async findById(@Param('id') id: number) {
    return await this.userService.findById(id);
  }
}
