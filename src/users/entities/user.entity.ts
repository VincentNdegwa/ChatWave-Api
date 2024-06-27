import { Exclude } from 'class-transformer';
import { Message } from 'src/messages/entities/message.entity';
import { Participant } from 'src/participants/entities/participant.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Verification } from 'src/verification/entities/verification.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone_number: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @OneToOne(() => Verification)
  @JoinColumn()
  verification: Verification;

  @OneToMany(() => Message, (message) => message.sender)
  messages: Message[];

  @OneToMany(() => Participant, (participant) => participant.user)
  participants: Participant[];
}
