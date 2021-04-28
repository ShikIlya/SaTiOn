import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessengerModule } from '../messenger.module';

import { MessageComponent } from './message.component';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MessengerModule,
        HttpClientModule
      ],
      declarations: [MessageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    component.message = {
      id: 1,
      content: 'test message',
      senderId: 1,
      creationTime: '2021-04-27 15:34:00.378221'
    }
    component.user = {
      id: 123,
      login: 'test',
      email: 'test@mail.ru',
      nickname: 'test',
    }
    fixture.detectChanges();
  });
  /* 
    it('should create', () => {
      expect(component).toBeTruthy();
    }); */
});
