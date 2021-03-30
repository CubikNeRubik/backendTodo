import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(username?: string): string {
    return username ? `Hello, ${username}!` : 'Hello World!';
  }
}
