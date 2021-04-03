import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
import { JwtParseMiddleware } from './common/jwt-parse.middleware';
import { dbHost } from './common/constants';

@Module({
  imports: [
    TodoModule,
    AuthModule,
    MongooseModule.forRoot(dbHost)
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtParseMiddleware)
      .forRoutes('*');
  }
}
