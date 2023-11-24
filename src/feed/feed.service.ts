import { Injectable } from '@nestjs/common';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';

@Injectable()
export class FeedService {
  create(createFeedDto: CreateFeedDto) {
    return 'This action adds a new Feed';
  }

  findAll() {
    return `This action returns all Feed`;
  }

  findOne(id: number) {
    return `This action returns a #${id} Feed`;
  }

  update(id: number, updateFeedDto: UpdateFeedDto) {
    return `This action updates a #${id} Feed`;
  }

  remove(id: number) {
    return `This action removes a #${id} Feed`;
  }
}
