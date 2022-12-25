import { TestBed } from '@angular/core/testing';

import { ProjectInformationService } from './project-information.service';

describe('ProjectInformationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectInformationService = TestBed.get(ProjectInformationService);
    expect(service).toBeTruthy();
  });
});
