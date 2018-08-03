import { TestBed, inject } from '@angular/core/testing';

import { HealthMonitService } from './health-monit.service';

describe('HealthMonitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HealthMonitService]
    });
  });

  it('should be created', inject([HealthMonitService], (service: HealthMonitService) => {
    expect(service).toBeTruthy();
  }));
});
