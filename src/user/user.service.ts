import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto, RegisterDto } from 'src/dto/userauth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async register(registerUser: RegisterDto) {
    const { email, password, name } = registerUser;
    const hashedPW = await bcrypt.hash(password, 10);
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) throw new Error('이미 존재하는 유저입니다');
    return await this.userRepository.save({
      email: email,
      password: hashedPW,
      name: name,
    });
  }

  async login(loginUser: LoginDto) {
    const { email, password } = loginUser;
    const user = await this.findByEmail(email);
    if (!user) throw new Error('존재하지 않는 유저입니다');
    console.log(user.name);
    if (!bcrypt.compare(password, user.password))
      throw new Error('비밀번호가 일치하지 않습니다');

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
