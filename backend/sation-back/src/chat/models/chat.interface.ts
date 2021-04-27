import { MessageI } from "./message.interface";

export interface ChatI {
  id?: string;
  name: string;
  creatorId?: number;
  creationTime?: string;
  messages?: MessageI[];
}