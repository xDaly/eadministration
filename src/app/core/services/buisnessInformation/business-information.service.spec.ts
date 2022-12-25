import { TestBed } from '@angular/core/testing';

import { BusinessInformationService } from './business-information.service';

describe('BusinessInformationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusinessInformationService = TestBed.get(BusinessInformationService);
    expect(service).toBeTruthy();
  });
});
