import { TestBed, inject } from '@angular/core/testing';

import { LiveresultService } from './liveresult.service';

describe('LiveresultService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LiveresultService]
    });
  });

  it('should be created', inject([LiveresultService], (service: LiveresultService) => {
    expect(service).toBeTruthy();
  }));
});
