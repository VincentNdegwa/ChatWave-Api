import { Injectable } from '@nestjs/common';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { DataSource, Repository } from 'typeorm';
import { createChatParams, createParticipantParams } from 'src/type';
import { ParticipantsService } from 'src/participants/participants.service';
import { Participant } from 'src/participants/entities/participant.entity';
import { Message } from 'src/messages/entities/message.entity';
import { ExtendedChat } from './chatInterface';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    @InjectRepository(Participant)
    private participantRepository: Repository<Participant>,
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

  async getUserChats(user_id: number) {
    try {
      const participants = await this.participantRepository.find({
        where: { user: { id: user_id } },
        relations: [
          'chat',
          'chat.participants',
          'chat.participants.user',
          'chat.participants.user.profile',
        ],
      });

      await Promise.all(
        participants.map(async (participant) => {
          const chatId = participant.chat.id;

          const latestMessage = await this.messageRepository.findOne({
            where: { chat: { id: chatId } },
            order: { sent_at: 'DESC' },
          });

          participant.chat['lastMessage'] = latestMessage;

          participants.sort((a, b) => {
            const hasMessageA = !!(a.chat as ExtendedChat).lastMessage;
            const hasMessageB = !!(b.chat as ExtendedChat).lastMessage;

            if (hasMessageA && hasMessageB) {
              return (
                (b.chat as ExtendedChat).lastMessage.sent_at.getTime() -
                (a.chat as ExtendedChat).lastMessage.sent_at.getTime()
              );
            } else if (hasMessageA) {
              return -1;
            } else if (hasMessageB) {
              return 1;
            } else {
              return b.chat.created_at.getTime() - a.chat.created_at.getTime();
            }
          });
        }),
      );

      return { error: false, message: 'Chats retrived', data: participants };
    } catch (error) {
      return { error: true, message: error.message, data: null };
    }
  }
}
