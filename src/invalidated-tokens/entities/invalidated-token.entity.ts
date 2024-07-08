import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'invalidatedTokens' })
export class InvalidatedToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  created_at: Date;
}
