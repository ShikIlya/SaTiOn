import { Message } from './message.model';

export interface Chat {
  id: string;
  name: string;
  creatorId?: number;
  creationTime?: string;
  messages?: Message[];
}
