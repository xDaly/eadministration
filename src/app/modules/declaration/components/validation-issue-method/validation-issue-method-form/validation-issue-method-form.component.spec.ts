import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationIssueMethodFormComponent } from './validation-issue-method-form.component';

describe('ValidationIssueMethodFormComponent', () => {
  let component: ValidationIssueMethodFormComponent;
  let fixture: ComponentFixture<ValidationIssueMethodFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationIssueMethodFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationIssueMethodFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
