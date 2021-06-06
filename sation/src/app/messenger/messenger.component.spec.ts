import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MessengerComponent } from './messenger.component';
import { MessengerModule } from './messenger.module';

describe('MessengerComponent', () => {
  let component: MessengerComponent;
  let fixture: ComponentFixture<MessengerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MessengerModule,
        HttpClientModule,
        RouterTestingModule,
      ],
      declarations: [MessengerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('компонент создается', () => {
    expect(component).toBeTruthy();
  });
});
