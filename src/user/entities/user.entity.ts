import { ApiProperty } from '@nestjs/swagger';
import { Feed } from 'src/feed/entities/feed.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({ description: '회원의 고유 번호' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '회원 이름' })
  @Column()
  name: string;

  @ApiProperty({ description: '회원 이메일' })
  @Index()
  @Column()
  email: string;

  @ApiProperty({ description: '회원의 암호화된 비밀번호' })
  @Column()
  password: string;

  @OneToMany(() => Feed, (feed) => feed.user, { cascade: true }) // eager 옵션을 추가하여 연관된 피드를 자동으로 로드하도록 설정
  feeds: Feed[];
}
