import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerProductComponent } from './seller-product.component';

describe('SellerProductComponent', () => {
  let component: SellerProductComponent;
  let fixture: ComponentFixture<SellerProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellerProductComponent]
    });
    fixture = TestBed.createComponent(SellerProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
