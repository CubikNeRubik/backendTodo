import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { CustomRequest } from '../interfaces/custom-request.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest<CustomRequest>();
    return !!user;
  }
}