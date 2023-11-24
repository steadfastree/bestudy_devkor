import { Module, Post } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Feed } from './entities/feed.entity';

@Module({
  controllers: [FeedController],
  providers: [FeedService],
  imports: [TypeOrmModule.forFeature([User, Feed])],
})
export class FeedModule {}
