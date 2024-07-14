import { Module } from '@nestjs/common';
import { GatwayService } from './gateway.service';
import { MessagesService } from 'src/messages/messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/messages/entities/message.entity';
import { ChatsService } from 'src/chats/chats.service';
import { UsersService } from 'src/users/users.service';
import { ParticipantsService } from 'src/participants/participants.service';
import { Chat } from 'src/chats/entities/chat.entity';
import { Participant } from 'src/participants/entities/participant.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Chat, Participant, User])],
  controllers: [],
  providers: [
    GatwayService,
    MessagesService,
    ChatsService,
    UsersService,
    ParticipantsService,
  ],
})
export class GateWayModule {}
