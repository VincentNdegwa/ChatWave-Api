import { Message } from 'src/messages/entities/message.entity';
import { Participant } from 'src/participants/entities/participant.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'chats' })
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  created_at: Date;

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];

  @OneToMany(() => Participant, (participant) => participant.chat)
  participants: Participant[];
}
