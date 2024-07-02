import { Injectable } from '@nestjs/common';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { Role, createParticipantParams } from 'src/type';
import { InjectRepository } from '@nestjs/typeorm';
import { Participant } from './entities/participant.entity';
import { EntityManager, In, Repository } from 'typeorm';
import { chatAndUserDto } from './dto/chat-and-user.dto';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectRepository(Participant)
    private participantRepository: Repository<Participant>,
  ) {}
  async create(
    createParticipantParams: createParticipantParams,
    manager: EntityManager,
  ) {
    try {
      const userIds = [
        createParticipantParams.userId.user_id,
        createParticipantParams.userId.added_user_id,
      ];
      const chatId = createParticipantParams.conversationId;
      const existPart = await this.participantRepository.find({
        where: { user: { id: In(userIds) }, chat: { id: chatId } },
      });

      if (existPart.length === userIds.length) {
        return {
          error: true,
          message: 'User exist in the chat',
          data: null,
        };
      }

      const participants = [];

      const userParticipant = this.participantRepository.create({
        chat: { id: createParticipantParams.conversationId },
        user: { id: createParticipantParams.userId.user_id },
        role: Role.ADMIN,
      });

      const addedUserParticipant = this.participantRepository.create({
        chat: { id: createParticipantParams.conversationId },
        user: { id: createParticipantParams.userId.added_user_id },
        role: Role.OTHER,
      });

      participants.push(userParticipant, addedUserParticipant);

      const allParticipants = await manager.save(Participant, participants);
      return {
        error: false,
        message: 'Partcipants created',
        data: allParticipants,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
        data: null,
      };
    }
  }

  async findBy(chatAndUserDto: chatAndUserDto) {
    try {
      const participants = await this.participantRepository.find({
        where: {
          chat: { id: chatAndUserDto.chatId },
          user: { id: chatAndUserDto.senderId },
        },
      });
      if (!participants || participants.length === 0) {
        return {
          error: true,
          message: "Chat or User don't exist",
          data: null,
        };
      } else {
        return {
          error: false,
          message: 'Participant found',
          data: participants,
        };
      }
    } catch (error) {
      return {
        error: true,
        message: error.message,
        data: null,
      };
    }
  }

  findAll() {
    return `This action returns all participants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} participant`;
  }

  update(id: number, updateParticipantDto: UpdateParticipantDto) {
    return `This action updates a #${id} participant ${updateParticipantDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} participant`;
  }
}
