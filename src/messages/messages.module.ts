import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { ChatsService } from 'src/chats/chats.service';
import { Chat } from 'src/chats/entities/chat.entity';
import { Participant } from 'src/participants/entities/participant.entity';
import { ParticipantsService } from 'src/participants/participants.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { InvalidatedTokensService } from 'src/invalidated-tokens/invalidated-tokens.service';
import { InvalidatedToken } from 'src/invalidated-tokens/entities/invalidated-token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Message,
      Chat,
      Participant,
      User,
      InvalidatedToken,
    ]),
  ],
  controllers: [MessagesController],
  providers: [
    MessagesService,
    ChatsService,
    ParticipantsService,
    UsersService,
    InvalidatedTokensService,
  ],
  exports: [MessagesService],
})
export class MessagesModule {}
