import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductionListComponent } from './production-list.component';


describe('ProductionListComponent', () => {
  let component: ProductionListComponent;
  let fixture: ComponentFixture<ProductionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
