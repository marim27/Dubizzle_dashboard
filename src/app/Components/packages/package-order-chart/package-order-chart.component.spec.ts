import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageOrderChartComponent } from './package-order-chart.component';

describe('PackageOrderChartComponent', () => {
  let component: PackageOrderChartComponent;
  let fixture: ComponentFixture<PackageOrderChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PackageOrderChartComponent]
    });
    fixture = TestBed.createComponent(PackageOrderChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
