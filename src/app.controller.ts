import { Controller, Get, Req } from '@nestjs/common';

import { AppService } from './app.service';
import { CustomRequest } from './interfaces/custom-request.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(@Req()req: CustomRequest): string {
    return this.appService.getHello(req.user?.fullname);
  }
}