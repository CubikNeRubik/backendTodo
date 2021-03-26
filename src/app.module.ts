import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CounterModule } from './counter/counter.module';

import { listModule } from './list/list.module';
import { AuthModule } from './sign-up/auth.module';

const password = "FFcA95XWvPDY92ai";
const uri = `mongodb+srv://vlad:${password}@cluster0.b8l4t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

@Module({
  imports: [
    listModule,
    AuthModule,
    MongooseModule.forRoot(`mongodb+srv://alina:alina1234@cluster0.f0yzw.mongodb.net/todo?retryWrites=true&w=majority`)
    // MongooseModule.forRoot(`mongodb+srv://admin:admin@cluster0.vqolf.mongodb.net/todo?retryWrites=true&w=majority`)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
