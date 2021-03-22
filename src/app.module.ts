import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { listModule } from './list/list.module';


@Module({
  imports: [
    listModule, 
    MongooseModule.forRoot(`mongodb+srv://alina:alina1234@cluster0.f0yzw.mongodb.net/todo?retryWrites=true&w=majority`)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
