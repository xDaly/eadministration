import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentCaseListComponent } from './current-case-list.component';

describe('CurrentCaseListComponent', () => {
  let component: CurrentCaseListComponent;
  let fixture: ComponentFixture<CurrentCaseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentCaseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentCaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
