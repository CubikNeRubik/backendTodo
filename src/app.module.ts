import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';


import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CounterModule } from './counter/counter.module';

import { listModule } from './list/list.module';
import { AuthModule } from './auth/auth.module';
import { Constants } from './constants';


@Module({
  imports: [
    listModule,
    AuthModule,
    MongooseModule.forRoot(Constants.DB)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
