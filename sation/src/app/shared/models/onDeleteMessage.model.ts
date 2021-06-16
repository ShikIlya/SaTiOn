import { Message } from './message.model';

export interface OnDeleteMessage {
  message: Message;
  deletedId: number;
  chatId: string;
}
