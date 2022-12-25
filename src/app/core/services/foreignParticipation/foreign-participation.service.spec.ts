import { TestBed } from '@angular/core/testing';

import { ForeignParticipationService } from './foreign-participation.service';

describe('ForeignParticipationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForeignParticipationService = TestBed.get(ForeignParticipationService);
    expect(service).toBeTruthy();
  });
});
