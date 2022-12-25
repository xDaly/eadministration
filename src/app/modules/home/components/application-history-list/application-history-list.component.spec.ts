import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationHistoryListComponent } from './application-history-list.component';

describe('ApplicationHistoryListComponent', () => {
  let component: ApplicationHistoryListComponent;
  let fixture: ComponentFixture<ApplicationHistoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationHistoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
