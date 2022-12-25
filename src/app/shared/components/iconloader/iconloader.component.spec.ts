import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconloaderComponent } from './iconloader.component';

describe('IconloaderComponent', () => {
  let component: IconloaderComponent;
  let fixture: ComponentFixture<IconloaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconloaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
