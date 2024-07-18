import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfilesModule } from './profiles/profiles.module';
import { VerificationModule } from './verification/verification.module';
import { User } from './users/entities/user.entity';
import { Profile } from './profiles/entities/profile.entity';
import { Verification } from './verification/entities/verification.entity';
import { ProfilesService } from './profiles/profiles.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ChatsModule } from './chats/chats.module';
import { MessagesModule } from './messages/messages.module';
import { Chat } from './chats/entities/chat.entity';
import { ParticipantsModule } from './participants/participants.module';
import { Message } from './messages/entities/message.entity';
import { Participant } from './participants/entities/participant.entity';
import { InvalidatedTokensModule } from './invalidated-tokens/invalidated-tokens.module';
import { InvalidatedToken } from './invalidated-tokens/entities/invalidated-token.entity';
import { GateWayModule } from './gateway/gateway.module';
import { ConfigModule } from '@nestjs/config';

import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        User,
        Profile,
        Verification,
        Chat,
        Message,
        Participant,
        InvalidatedToken,
      ],
      synchronize: true,
      logging: true,
    }),
    ProfilesModule,
    UsersModule,
    VerificationModule,
    AuthModule,
    ChatsModule,
    MessagesModule,
    ParticipantsModule,
    InvalidatedTokensModule,
    GateWayModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ProfilesService],
})
export class AppModule {}
