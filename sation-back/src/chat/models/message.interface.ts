import { UserI } from 'src/user/models/user.interface';
import { ChatI } from './chat.interface';

export interface MessageI {
  id?: number;
  content: string;
  chatId: string;
  senderId: number;
  creationTime: string;
  user?;
}
