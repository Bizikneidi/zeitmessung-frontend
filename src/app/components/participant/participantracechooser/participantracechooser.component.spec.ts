import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantracechooserComponent } from './participantracechooser.component';

describe('ParticipantracechooserComponent', () => {
  let component: ParticipantracechooserComponent;
  let fixture: ComponentFixture<ParticipantracechooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantracechooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantracechooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
