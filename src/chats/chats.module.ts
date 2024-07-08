import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { ParticipantsService } from 'src/participants/participants.service';
import { Participant } from 'src/participants/entities/participant.entity';
import { MessagesService } from 'src/messages/messages.service';
import { Message } from 'src/messages/entities/message.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { InvalidatedTokensService } from 'src/invalidated-tokens/invalidated-tokens.service';
import { InvalidatedToken } from 'src/invalidated-tokens/entities/invalidated-token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Chat,
      Participant,
      Message,
      User,
      InvalidatedToken,
    ]),
  ],
  controllers: [ChatsController],
  providers: [
    ChatsService,
    ParticipantsService,
    MessagesService,
    UsersService,
    InvalidatedTokensService,
  ],
  exports: [ChatsService],
})
export class ChatsModule {}
