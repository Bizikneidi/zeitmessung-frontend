import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterparticipantComponent } from './registerparticipant.component';

describe('RegisterparticipantComponent', () => {
  let component: RegisterparticipantComponent;
  let fixture: ComponentFixture<RegisterparticipantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterparticipantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterparticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
