import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationcardsComponent } from './navigationcards.component';

describe('NavigationcardsComponent', () => {
  let component: NavigationcardsComponent;
  let fixture: ComponentFixture<NavigationcardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationcardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
