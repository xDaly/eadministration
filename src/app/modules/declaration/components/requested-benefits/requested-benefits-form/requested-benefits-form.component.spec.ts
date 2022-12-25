import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedBenefitsFormComponent } from './requested-benefits-form.component';

describe('RequestedBenefitsFormComponent', () => {
  let component: RequestedBenefitsFormComponent;
  let fixture: ComponentFixture<RequestedBenefitsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestedBenefitsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestedBenefitsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
