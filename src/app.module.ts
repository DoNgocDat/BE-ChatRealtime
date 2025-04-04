import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
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
      entities: [User],
      synchronize: true,
    }),    
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
