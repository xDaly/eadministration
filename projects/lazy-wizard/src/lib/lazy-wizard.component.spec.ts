import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyWizardComponent } from './lazy-wizard.component';

describe('LazyWizardComponent', () => {
  let component: LazyWizardComponent;
  let fixture: ComponentFixture<LazyWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LazyWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
