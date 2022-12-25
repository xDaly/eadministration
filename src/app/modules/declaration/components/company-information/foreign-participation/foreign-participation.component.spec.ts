import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForeignParticipationComponent } from './foreign-participation.component';

describe('ForeignParticipationComponent', () => {
  let component: ForeignParticipationComponent;
  let fixture: ComponentFixture<ForeignParticipationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForeignParticipationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForeignParticipationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
