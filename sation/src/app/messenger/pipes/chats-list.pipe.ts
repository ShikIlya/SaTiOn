import { Pipe, PipeTransform } from '@angular/core';
import { Chat } from 'src/app/shared/models/chat.model';

@Pipe({
  name: 'chatsList',
  pure: false,
})
export class ChatsListPipe implements PipeTransform {
  transform(chats: Chat[], ...args: any[]): Chat[] {
    return chats.sort((a, b) => {
      if (a.messages.length > 0 && b.messages.length > 0) {
        return this.compareTime(
          a.messages[0].creationTime,
          b.messages[0].creationTime
        );
      }
      if (a.messages.length > 0 && b.messages.length === 0) {
        return this.compareTime(a.messages[0].creationTime, b.creationTime);
      }
      if (a.messages.length === 0 && b.messages.length > 0) {
        return this.compareTime(a.creationTime, b.messages[0].creationTime);
      }
      return this.compareTime(a.creationTime, b.creationTime);
    });
  }

  compareTime(a: string, b: string): number {
    return new Date(b).getTime() - new Date(a).getTime();
  }
}
