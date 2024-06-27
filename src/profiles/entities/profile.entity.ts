import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'profiles' })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  profile_pic: string;

  @Column()
  about: string;

  @Column()
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;
}
