import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForeignParticipationFormComponent } from './foreign-participation-form.component';

describe('ForeignParticipationFormComponent', () => {
  let component: ForeignParticipationFormComponent;
  let fixture: ComponentFixture<ForeignParticipationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForeignParticipationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForeignParticipationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
