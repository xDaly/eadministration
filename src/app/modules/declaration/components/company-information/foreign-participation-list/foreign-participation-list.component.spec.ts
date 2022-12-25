import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForeignParticipationListComponent } from './foreign-participation-list.component';

describe('ForeignParticipationListComponent', () => {
  let component: ForeignParticipationListComponent;
  let fixture: ComponentFixture<ForeignParticipationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForeignParticipationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForeignParticipationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
