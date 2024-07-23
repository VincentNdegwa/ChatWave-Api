/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';
import { MessagesService } from 'src/messages/messages.service';
import { newMessageDto } from './types/new-message.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
// @UseGuards(AuthGuard)
export class GatewayService
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(private messageService: MessagesService) {}

  afterInit(server: Server) {
    console.log('Initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

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
    try {
      const responseMessage =
        await this.messageService.create(savingMessageData);
      socket
        .to([message.sender_id.toString(), message.receiver_id.toString()])
        .emit('messageReceived', responseMessage);
      console.log(responseMessage);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  @SubscribeMessage('join')
  onJoin(@MessageBody() userId: number, @ConnectedSocket() socket: Socket) {
    socket.join(userId.toString());
    console.log('Joined as ' + userId);
  }

  @SubscribeMessage('call-user')
  handleCallUser(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { receiver_id: number; sender_id: number },
  ) {
    try {
      const { receiver_id, sender_id } = payload;

      client.to(receiver_id.toString()).emit('call-user', payload);
      console.log('Calling user ' + payload.receiver_id);
    } catch (error) {
      console.error('Error in handleCallUser:', error);
    }
  }

  @SubscribeMessage('answer-call')
  handleAnswerCall(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { to: string; peerId: string },
  ) {
    console.log(payload);

    client.to(payload.to).emit('call-accepted', { peerId: payload.peerId });
  }
}
