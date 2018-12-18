import { TestBed, inject } from '@angular/core/testing';

import { LiveTimerService } from './livetimer.service';

describe('LiveTimerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LiveTimerService]
    });
  });

  it('should be created', inject([LiveTimerService], (service: LiveTimerService) => {
    expect(service).toBeTruthy();
  }));
});
