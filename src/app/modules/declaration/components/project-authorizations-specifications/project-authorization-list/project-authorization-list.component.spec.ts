import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAuthorizationListComponent } from './project-authorization-list.component';

describe('ProjectAuthorizationListComponent', () => {
  let component: ProjectAuthorizationListComponent;
  let fixture: ComponentFixture<ProjectAuthorizationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectAuthorizationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAuthorizationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
