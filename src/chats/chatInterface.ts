import { Message } from 'src/messages/entities/message.entity';
import { Chat } from './entities/chat.entity';

export interface ExtendedChat extends Chat {
  lastMessage?: Message; // Optional because lastMessage may not always exist
}
