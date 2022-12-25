import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAuthorizationsSpecificationsComponent } from './project-authorizations-specifications.component';

describe('ProjectAuthorizationsSpecificationsComponent', () => {
  let component: ProjectAuthorizationsSpecificationsComponent;
  let fixture: ComponentFixture<ProjectAuthorizationsSpecificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectAuthorizationsSpecificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAuthorizationsSpecificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
