import { Injectable } from '@nestjs/common';
import { UpdateMessageDto } from './dto/update-message.dto';
import { createMessageParams } from 'src/type';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { ChatsService } from 'src/chats/chats.service';
import { UsersService } from 'src/users/users.service';
import { ParticipantsService } from 'src/participants/participants.service';
import { chatAndUserDto } from 'src/participants/dto/chat-and-user.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    private chatService: ChatsService,
    private userService: UsersService,
    private participantService: ParticipantsService,
  ) {}
  async create(createMessageParams: createMessageParams) {
    try {
      const chatExistData = await this.chatService.findExactlyOne(
        createMessageParams.chat_id,
      );
      if (!chatExistData || chatExistData.error) {
        return chatExistData;
      }
      const chatAndUserDto: chatAndUserDto = {
        chatId: createMessageParams.chat_id,
        senderId: createMessageParams.sender_id,
      };
      const participantExistData =
        await this.participantService.findBy(chatAndUserDto);
      if (
        !participantExistData ||
        participantExistData.error ||
        participantExistData.data.length === 0
      ) {
        return {
          error: true,
          message: 'User is not a participant of the chat',
          data: null,
        };
      }

      const newMessage = this.messageRepository.create({
        text: createMessageParams.text,
        sent_at: new Date(),
        chat: { id: createMessageParams.chat_id },
        sender: { id: createMessageParams.sender_id },
      });

      const savedMessage = await this.messageRepository.save(newMessage);
      const retrievedMessage = await this.findOne(savedMessage.id);
      return retrievedMessage;
    } catch (error) {
      return {
        error: true,
        message: 'Failed to create message',
        data: error.message,
      };
    }
  }

  async findOne(id: number) {
    try {
      const chats = await this.messageRepository.findOne({
        where: { id },
        relations: ['sender', 'sender.profile'],
      });
      if (!chats) {
        return {
          error: true,
          message: 'Message not found',
          data: null,
        };
      } else {
        return { error: false, message: 'Message retrieved', data: chats };
      }
    } catch (error) {}
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    const message = await this.messageRepository.update(
      { id },
      {
        ...updateMessageDto,
        updated_at: new Date(),
      },
    );
    if (message) {
      const updatedMessage = await this.findOne(id);
      if (updatedMessage.error) {
        return updatedMessage;
      } else {
        return {
          error: false,
          message: 'Message Updated',
          data: updatedMessage,
        };
      }
    } else {
      return {
        error: true,
        message: 'Failed to update message',
        data: null,
      };
    }
  }

  findAll() {
    return `This action returns all messages`;
  }

  async remove(id: number) {
    try {
      const message = await this.messageRepository.delete(id);

      if (message.affected) {
        return { error: false, message: 'Message deleted', data: message };
      } else {
        return { error: true, message: 'Message not found', data: null };
      }
    } catch (error) {
      return { error: true, message: error.message, data: null };
    }
  }
}
