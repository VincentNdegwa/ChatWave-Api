import { Injectable } from '@nestjs/common';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { DataSource, Repository } from 'typeorm';
import { createChatParams, createParticipantParams } from 'src/type';
import { ParticipantsService } from 'src/participants/participants.service';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    private participantService: ParticipantsService,
    private dataSource: DataSource,
  ) {}
  async create(createChatParams: createChatParams) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newChat = this.chatRepository.create({
        created_at: new Date(),
      });
      const savedChat = await queryRunner.manager.save(newChat);
      if (!savedChat || !savedChat.id) {
        throw new Error('Failed to save chat or get valid ID');
      }
      const chatId: number = savedChat.id;

      const participantData: createParticipantParams = {
        conversationId: chatId,
        userId: createChatParams,
      };

      const { error, message } = await this.participantService.create(
        participantData,
        queryRunner.manager,
      );

      if (error) {
        await queryRunner.rollbackTransaction();

        return {
          error: true,
          message: message,
          data: null,
        };
      } else {
        await queryRunner.commitTransaction();

        const chatData = await this.findOne(chatId);

        return {
          error: false,
          message: 'Chat created',
          chatId: chatId,
          data: chatData,
        };
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();

      return {
        error: true,
        message: 'An error occurred while creating chat and participants',
        data: error.message,
      };
    } finally {
      await queryRunner.release();
    }
  }

  async findExactlyOne(id: number) {
    const chatsData = await this.chatRepository.findOne({
      where: { id },
    });
    if (!chatsData) {
      return { error: true, message: 'Chat not found', data: null };
    } else {
      return { error: false, message: 'Chat found', data: chatsData };
    }
  }

  async findOne(id: number) {
    const chatsData = await this.chatRepository.findOne({
      where: { id },
      relations: [
        'participants',
        'participants.user',
        'participants.user.profile',
        'messages',
        'messages.sender.profile',
      ],
    });
    return chatsData;
  }

  async getChatOnly(id: number) {
    const chat = await this.chatRepository.findOne({ where: { id } });
    return {
      error: false,
      message: 'Chat retreived',
      data: chat,
    };
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat ${updateChatDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
