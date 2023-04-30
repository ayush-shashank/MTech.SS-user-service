import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;
  @Column({ unique: true })
  username: string;
  @Column()
  name: string;
  @Column({ unique: true })
  emailId: string;
  @Column()
  password: string;
}
