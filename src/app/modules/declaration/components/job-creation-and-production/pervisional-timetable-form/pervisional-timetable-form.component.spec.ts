import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PervisionalTimetableFormComponent } from './pervisional-timetable-form.component';

describe('PervisionalTimetableFormComponent', () => {
  let component: PervisionalTimetableFormComponent;
  let fixture: ComponentFixture<PervisionalTimetableFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PervisionalTimetableFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PervisionalTimetableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
