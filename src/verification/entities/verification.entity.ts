import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'verifications' })
export class Verification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  OTP: number;
}
