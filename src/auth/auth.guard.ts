import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtPayloadDto } from 'src/dto/jwt.payload.dto';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);
    if (!token) throw new UnauthorizedException();
    try {
      const payload: JwtPayloadDto = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      request.user = payload;
      console.log(payload);
    } catch (e) {
      throw new UnauthorizedException();
    }
    return true;
  }
  private extractToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization.split(' ');
    return type === 'Bearer' ? token : undefined; //헤더의 authorization을 찾아서 공백 스플릿, bearer가 아니라면 undefined. 맞으면 헤당 토큰 리턴
  }
}
//https://docs.nestjs.com/security/authentication
