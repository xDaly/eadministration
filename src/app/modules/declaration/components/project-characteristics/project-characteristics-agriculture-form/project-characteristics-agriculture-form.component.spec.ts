import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCharacteristicsAgricultureFormComponent } from './project-characteristics-agriculture-form.component';

describe('ProjectCharacteristicsFormComponent', () => {
  let component: ProjectCharacteristicsAgricultureFormComponent;
  let fixture: ComponentFixture<ProjectCharacteristicsAgricultureFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectCharacteristicsAgricultureFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCharacteristicsAgricultureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
