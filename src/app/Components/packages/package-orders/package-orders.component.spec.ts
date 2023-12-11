import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageOrdersComponent } from './package-orders.component';

describe('PackageOrdersComponent', () => {
  let component: PackageOrdersComponent;
  let fixture: ComponentFixture<PackageOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PackageOrdersComponent]
    });
    fixture = TestBed.createComponent(PackageOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
