import { createChatParams } from 'src/type';

export class CreateParticipantDto {
  conversationId: number;
  userId: createChatParams;
}
