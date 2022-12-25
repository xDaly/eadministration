import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCreationAndProductionComponent } from './job-creation-and-production.component';

describe('JobCreationAndProductionComponent', () => {
  let component: JobCreationAndProductionComponent;
  let fixture: ComponentFixture<JobCreationAndProductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobCreationAndProductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCreationAndProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
