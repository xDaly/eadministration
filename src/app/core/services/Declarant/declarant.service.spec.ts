import { TestBed } from '@angular/core/testing';

import { DeclarantService } from './declarant.service';

describe('DeclarantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeclarantService = TestBed.get(DeclarantService);
    expect(service).toBeTruthy();
  });
});
