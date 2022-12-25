import { TestBed } from '@angular/core/testing';

import { LazyWizardService } from './lazy-wizard.service';

describe('LazyWizardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LazyWizardService = TestBed.get(LazyWizardService);
    expect(service).toBeTruthy();
  });
});
