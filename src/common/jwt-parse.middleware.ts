import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response, NextFunction } from 'express';
import { CustomRequest } from '../interfaces/custom-request.interface';
import { UserDto } from '../auth/auth-dto/user.dto';

export const X_AUTH_TOKEN = 'X-Auth-Token'; 

@Injectable()
export class JwtParseMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: CustomRequest, res: Response, next: NextFunction) {
    // get value of 'X-Auth-Token' header
    const accessToken = req.get(X_AUTH_TOKEN);

    if (accessToken) {
      // parse token and store result in request object
      req.user = await this.jwtService.verifyAsync<UserDto>(accessToken);
    }

    next();
  }
}
