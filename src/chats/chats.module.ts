import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { ParticipantsService } from 'src/participants/participants.service';
import { Participant } from 'src/participants/entities/participant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, Participant])],
  controllers: [ChatsController],
  providers: [ChatsService, ParticipantsService],
  exports: [ChatsService],
})
export class ChatsModule {}
