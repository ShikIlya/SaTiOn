import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';

import { Chat } from 'src/app/shared/models/chat.model';
import { ChatService } from './chat.service';

describe('ChatService', () => {
  let service: ChatService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ChatService]
    });
    service = TestBed.inject(ChatService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('be able to retrieve user chats from the API by GET method', () => {
    const testChats: Chat[] = [{
      id: '1',
      name: 'chat-test-1',
      creatorId: 1,
      creationTime: '2021-04-18 13:50:54.279531',
      messages: [
        {
          id: 1,
          content: 'privet',
          senderId: 1,
          creationTime: '2021-04-27 15:34:00.378221'
        },
        {
          id: 2,
          content: 'hello',
          senderId: 2,
          creationTime: '2021-04-27 15:35:00.245678'
        },
      ]
    },
    {
      id: '2',
      name: 'chat-test-2',
      creatorId: 1,
      creationTime: '2021-04-18 13:55:00.279531',
      messages: [
        {
          id: 1,
          content: 'test',
          senderId: 1,
          creationTime: '2021-04-27 15:36:00.378221'
        },
        {
          id: 2,
          content: 'test-2',
          senderId: 1,
          creationTime: '2021-04-27 15:37:00.245678'
        },
      ]
    }];
    service.getUserChats().subscribe(chats => {
      expect(chats.length).toBe(2);
      expect(chats).toEqual(chats);
    });
    const request = httpMock.expectOne(`${service.apiUrl}/chat`);
    expect(request.request.method).toBe('GET');
    request.flush(testChats);

    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });
});
