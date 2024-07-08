import { Module } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { ParticipantsController } from './participants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from './entities/participant.entity';
import { InvalidatedToken } from 'src/invalidated-tokens/entities/invalidated-token.entity';
import { InvalidatedTokensService } from 'src/invalidated-tokens/invalidated-tokens.service';

@Module({
  imports: [TypeOrmModule.forFeature([Participant, InvalidatedToken])],
  controllers: [ParticipantsController],
  providers: [ParticipantsService, InvalidatedTokensService],
  exports: [ParticipantsService],
})
export class ParticipantsModule {}
