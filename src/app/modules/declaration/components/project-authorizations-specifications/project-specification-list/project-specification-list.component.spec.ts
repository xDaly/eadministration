import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSpecificationListComponent } from './project-specification-list.component';

describe('ProjectSpecificationListComponent', () => {
  let component: ProjectSpecificationListComponent;
  let fixture: ComponentFixture<ProjectSpecificationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSpecificationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSpecificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
