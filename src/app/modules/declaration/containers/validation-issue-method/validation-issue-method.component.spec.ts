import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationIssueMethodComponent } from './validation-issue-method.component';

describe('ValidationIssueMethodComponent', () => {
  let component: ValidationIssueMethodComponent;
  let fixture: ComponentFixture<ValidationIssueMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationIssueMethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationIssueMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
