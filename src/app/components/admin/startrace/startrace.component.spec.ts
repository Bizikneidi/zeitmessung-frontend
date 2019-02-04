import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartRaceComponent } from './startrace.component';

describe('StartRaceComponent', () => {
  let component: StartRaceComponent;
  let fixture: ComponentFixture<StartRaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartRaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartRaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
