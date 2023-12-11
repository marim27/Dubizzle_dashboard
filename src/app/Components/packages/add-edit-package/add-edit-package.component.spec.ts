import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPackageComponent } from './add-edit-package.component';

describe('AddEditPackageComponent', () => {
  let component: AddEditPackageComponent;
  let fixture: ComponentFixture<AddEditPackageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditPackageComponent]
    });
    fixture = TestBed.createComponent(AddEditPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
