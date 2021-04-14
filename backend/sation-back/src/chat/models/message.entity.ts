import { UserEntity } from "src/user/models/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ChatEntity } from "./chat.entity";


@Entity()
export class MessageEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 500, nullable: false})
  content: string;
  
  @ManyToOne(type => ChatEntity, chat => chat.messages, {nullable: false})
  @JoinColumn({ name: "chatId", referencedColumnName: "id" })
  chatId: string

  @ManyToOne(type => UserEntity, user => user.messages, {nullable: false})
  @JoinColumn({ name: "senderId", referencedColumnName: "id" })
  senderId: number;

  @CreateDateColumn()
  creationTime: string;

}