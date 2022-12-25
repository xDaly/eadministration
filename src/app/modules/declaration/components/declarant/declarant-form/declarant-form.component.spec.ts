import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclarantFormComponent } from './declarant-form.component';

describe('DeclarantFormComponent', () => {
  let component: DeclarantFormComponent;
  let fixture: ComponentFixture<DeclarantFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeclarantFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclarantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
