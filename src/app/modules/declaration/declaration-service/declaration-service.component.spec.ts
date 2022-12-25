import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclarationServiceComponent } from './declaration-service.component';

describe('DeclarationService', () => {
  let component: DeclarationServiceComponent;
  let fixture: ComponentFixture<DeclarationServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeclarationServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclarationServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
