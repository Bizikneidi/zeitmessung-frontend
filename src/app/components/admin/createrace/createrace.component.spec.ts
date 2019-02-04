import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRaceComponent } from './createrace.component';

describe('CreateRaceComponent', () => {
  let component: CreateRaceComponent;
  let fixture: ComponentFixture<CreateRaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
