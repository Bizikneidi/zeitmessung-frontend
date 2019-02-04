import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveresultlistComponent } from './liveresultlist.component';

describe('LiveresultlistComponent', () => {
  let component: LiveresultlistComponent;
  let fixture: ComponentFixture<LiveresultlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveresultlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveresultlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
