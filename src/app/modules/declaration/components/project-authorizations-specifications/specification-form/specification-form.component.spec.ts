import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificationFormComponent } from './specification-form.component';

describe('SpecificationFormComponent', () => {
  let component: SpecificationFormComponent;
  let fixture: ComponentFixture<SpecificationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
