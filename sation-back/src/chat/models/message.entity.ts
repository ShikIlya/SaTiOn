import { UserEntity } from 'src/user/models/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatEntity } from './chat.entity';

@Entity()
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, nullable: false })
  content: string;

  @ManyToOne((type) => ChatEntity, (chat) => chat.messages, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'chatId', referencedColumnName: 'id' })
  chat: string;

  @Column()
  chatId: string;

  @ManyToOne((type) => UserEntity, (user) => user.messages, { nullable: false })
  @JoinColumn({ name: 'senderId', referencedColumnName: 'id' })
  user: number;

  @Column()
  senderId: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  creationTime: string;
}
