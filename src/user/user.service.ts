import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto, RegisterDto } from 'src/user/dto/user-auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async register(registerUser: RegisterDto) {
    const { email, password, name } = registerUser;

    const hashedPW = await bcrypt.hash(password, 10);

    const user = await this.userRepository.findOne({ where: { email: email } });

    if (user)
      throw new HttpException('이미 존재하는 유저입니다', HttpStatus.CONFLICT);

    return await this.userRepository.save({
      email: email,
      password: hashedPW,
      name: name,
    });
  }

  async login(loginUser: LoginDto) {
    const { email, password } = loginUser;
    /* if (email == undefined || password == undefined)
      throw new HttpException(
        '올바른 입력 값이 아닙니다',
        HttpStatus.BAD_REQUEST,
      );*/

    const user = await this.userRepository.findOneOrFail({
      // 여기서 email에 undefined가 들어가면 테이블의 첫 번째 값을 출력하는데 왜인지 모르겠음.. 일단 유효성 검사로 일어나지 않게 함.
      where: { email: email },
    });
    console.log(user);
    if (!user)
      throw new HttpException(
        '존재하지 않는 유저입니다',
        HttpStatus.BAD_REQUEST,
      );

    if (!bcrypt.compare(password, user.password))
      throw new HttpException(
        '비밀번호가 일치하지 않습니다',
        HttpStatus.BAD_REQUEST,
      );

    return {
      accessToken: await this.jwtService.signAsync({
        id: user.id,
        name: user.name,
      }),
    };
  }

  async getProfile(id: number) {
    const user = await this.findById(id);
    return { id: user.id, name: user.name, email: user.email };
  }
}
