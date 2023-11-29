import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feed } from './entities/feed.entity';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(Feed) private readonly feedRepository: Repository<Feed>,
  ) {}
  async createFeed(userId: number, createFeedDto: CreateFeedDto) {
    return await this.feedRepository.save({ id: userId, ...createFeedDto });
  }

  async getFeedList(page: number) {
    const [feedList, count] = await this.feedRepository.findAndCount({
      take: 10,
      skip: (page - 1) * 10,
    });
    return { feedList, count };
  }

  async getFeedDetail(feedId: number) {
    const feedDetail = await this.feedRepository.findOneByOrFail({
      id: feedId,
    });
    feedDetail.views += 1; //조회수 증가
    return await this.feedRepository.save(feedDetail);
  }

  async updateFeed(
    userId: number,
    feedId: number,
    updateFeedDto: UpdateFeedDto,
  ) {
    const existingFeed = await this.feedRepository.findOneByOrFail({
      id: feedId,
    });
    if (existingFeed.userId != userId)
      throw new ForbiddenException('허용되지 않은 접근입니다');

    return await this.feedRepository.save({
      ...existingFeed,
      ...updateFeedDto,
    });
  }

  async removeFeed(userId, feedId: number) {
    const existingFeed = await this.feedRepository.findOneByOrFail({
      id: feedId,
    });
    if (existingFeed.userId != userId)
      throw new ForbiddenException('허용되지 않은 접근입니다');

    return await this.feedRepository.remove(existingFeed);
  }
}
