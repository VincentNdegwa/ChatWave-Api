import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Chat } from 'src/chats/entities/chat.entity';
import { Role } from 'src/type';

@Entity({ name: 'participants' })
export class Participant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Chat, (chat) => chat.participants)
  chat: Chat;

  @ManyToOne(() => User, (user) => user.participants)
  user: User;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.OTHER,
  })
  role: Role;
}
