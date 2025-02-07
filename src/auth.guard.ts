
import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'
import { Constants } from './constants';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if(!request.headers.authorization){
        return false
    }
    request.user = await this.validateToken(request.headers.authorization)
  
    return true
  }

async validateToken(auth:string){
    if(auth.split(' ')[0] !== 'Bearer'){
        throw new HttpException('Invalid token', HttpStatus.FORBIDDEN)
    }
    const token = auth.split(' ')[1];
    try{
        const decoded = await jwt.verify(token, Constants.secret)
        return decoded
    }catch(err){
        const message = 'Token error' + (err.message || err.name);
        throw new HttpException(message, HttpStatus.FORBIDDEN)
    }
    
}

}