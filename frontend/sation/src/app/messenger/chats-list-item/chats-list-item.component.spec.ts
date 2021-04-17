import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatsListItemComponent } from './chats-list-item.component';

describe('ChatsListItemComponent', () => {
  let component: ChatsListItemComponent;
  let fixture: ComponentFixture<ChatsListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatsListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
