import { ForbiddenException, Injectable } from '@nestjs/common';
import { FeedDto } from './dto/feed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feed } from './entities/feed.entity';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(Feed) private readonly feedRepository: Repository<Feed>,
  ) {}
  async createFeed(userId: number, feedDto: FeedDto) {
    console.log(userId);
    console.log(feedDto);
    return await this.feedRepository.save({ userId: userId, ...feedDto });
  }

  async getFeedList(page: number) {
    const [feedList, count] = await this.feedRepository.findAndCount({
      take: 10,
      skip: (page - 1) * 10, //pagination
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

  async updateFeed(userId: number, feedId: number, feedDto: FeedDto) {
    const existingFeed = await this.feedRepository.findOneByOrFail({
      id: feedId,
    });
    if (existingFeed.userId != userId)
      throw new ForbiddenException('허용되지 않은 접근입니다');

    return await this.feedRepository.save({
      ...existingFeed,
      ...feedDto,
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
