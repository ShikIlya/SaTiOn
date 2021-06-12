import { UserEntity } from 'src/user/models/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatEntity } from './chat.entity';

@Entity()
export class ChatTicketEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => ChatEntity, (chat) => chat.tickets, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'chatId', referencedColumnName: 'id' })
  chatId: string;

  @ManyToOne((type) => UserEntity, (user) => user.tickets, { nullable: false })
  @JoinColumn({ name: 'memberId', referencedColumnName: 'id' })
  memberId: number;

  @CreateDateColumn({ select: false })
  creationTime: string;
}
