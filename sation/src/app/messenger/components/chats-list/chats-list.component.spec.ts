import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessengerModule } from '../../messenger.module';
import { HttpClientModule } from '@angular/common/http';
import { ChatsListComponent } from './chats-list.component';
import { DataStoreService } from 'src/app/shared/services/data-store/data-store.service';
import { Chat } from 'src/app/shared/models/chat.model';

describe('ChatsListComponent', () => {
  let component: ChatsListComponent;
  let service: DataStoreService;
  let currentChat: Chat;
  let fixture: ComponentFixture<ChatsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessengerModule, HttpClientModule],
      declarations: [ChatsListComponent],
      providers: [DataStoreService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatsListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(DataStoreService);
    fixture.detectChanges();
  });

  it('изменение текущего чата в глобальном сторе', () => {
    component.userChats = [
      {
        id: '1',
        name: 'chat-test-1',
        creatorId: 1,
        creationTime: '2021-04-18 13:50:54.279531',
        messages: [
          {
            id: 1,
            content: 'privet',
            senderId: 1,
            creationTime: '2021-04-27 15:34:00.378221',
          },
          {
            id: 2,
            content: 'hello',
            senderId: 2,
            creationTime: '2021-04-27 15:35:00.245678',
          },
        ],
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
            creationTime: '2021-04-27 15:36:00.378221',
          },
          {
            id: 2,
            content: 'test-2',
            senderId: 1,
            creationTime: '2021-04-27 15:37:00.245678',
          },
        ],
      },
    ];
    service.getCurrentChat().subscribe((v) => (currentChat = v));
    component.setSelectedChat(component.userChats[0].id);
    expect(currentChat).toEqual(component.userChats[0]);
  });

  it('компонент создается', () => {
    expect(component).toBeTruthy();
  });
});
