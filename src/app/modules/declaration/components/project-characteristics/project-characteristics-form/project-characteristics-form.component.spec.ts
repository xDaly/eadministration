import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCharacteristicsFormComponent } from './project-characteristics-form.component';

describe('ProjectCharacteristicsFormComponent', () => {
  let component: ProjectCharacteristicsFormComponent;
  let fixture: ComponentFixture<ProjectCharacteristicsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectCharacteristicsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCharacteristicsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
