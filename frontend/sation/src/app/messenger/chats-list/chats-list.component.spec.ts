import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessengerModule } from '../messenger.module';
import { HttpClientModule } from '@angular/common/http';
import { ChatsListComponent } from './chats-list.component';

describe('ChatsListComponent', () => {
  let component: ChatsListComponent;
  let fixture: ComponentFixture<ChatsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MessengerModule,
        HttpClientModule
      ],
      declarations: [ChatsListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
