import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAuthorizationSpecificationFormComponent } from './project-authorization-specification-form.component';

describe('ProjectAuthorizationSpecificationFormComponent', () => {
  let component: ProjectAuthorizationSpecificationFormComponent;
  let fixture: ComponentFixture<ProjectAuthorizationSpecificationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectAuthorizationSpecificationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAuthorizationSpecificationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
