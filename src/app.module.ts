import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RatingModule } from './rating/rating.module';
import { Rating } from './rating/rating.entity';
// import { ChatModule } from './chat/chat.module';
// import { Message } from './chat/entities/message.entity';
import { User } from './users/users.entity';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-cvnkkkbuibrs738brdb0-a',
      port: 5432,
      username: 'chatrealtime_user',
      password: 'x1oXpTjvDiy3KFLBFFtilwHpeIOIpCeR',
      database: 'chatrealtime',
      // host: 'localhost',
      // port: 5432,
      // username: 'postgres',
      // password: '12345',
      // database: 'chatRealtime',
      entities: [User, Rating],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    RatingModule,
  ],
  // controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule { }
