import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';
import { MessagesService } from 'src/messages/messages.service';
import { newMessageDto } from './types/new-message.dto';

@WebSocketGateway()
export class GatwayService {
  constructor(private messageService: MessagesService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('newMessage')
  async onNewMessage(
    @MessageBody() message: newMessageDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const savingMessageData: CreateMessageDto = {
      text: message.text,
      chat_id: message.chat_id,
      sender_id: message.sender_id,
    };
    const responseMessage = await this.messageService.create(savingMessageData);
    socket.emit('onMessage', responseMessage);
  }
}
