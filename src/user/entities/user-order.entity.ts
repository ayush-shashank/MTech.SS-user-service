import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unsigned: true, unique: false })
  userId: number;

  @OneToMany(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  orderId: number;

  @BeforeInsert()
  mapId() {
    this.userId = this.user.id;
  }
}
