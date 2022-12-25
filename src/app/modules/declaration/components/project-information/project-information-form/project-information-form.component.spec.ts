import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInformationFormComponent } from './project-information-form.component';

describe('ProjectInformationFormComponent', () => {
  let component: ProjectInformationFormComponent;
  let fixture: ComponentFixture<ProjectInformationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectInformationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectInformationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
