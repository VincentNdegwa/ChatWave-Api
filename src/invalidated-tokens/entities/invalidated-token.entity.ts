import { Column, Entity } from 'typeorm';

@Entity({ name: 'invalidatedTokens' })
export class InvalidatedToken {
  @Column()
  token: string;

  @Column()
  created_at: Date;
}
