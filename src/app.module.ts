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
import { InvalidatedTokensModule } from './invalidated-tokens/invalidated-tokens.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'vincent',
      password: 'Vincent07$',
      database: 'ChatWave',
      entities: [User, Profile, Verification, Chat, Message, Participant],
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
  ],
  controllers: [AppController],
  providers: [AppService, ProfilesService],
})
export class AppModule {}
