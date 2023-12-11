import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSubCategoriesComponent } from './add-edit-sub-categories.component';

describe('AddEditSubCategoriesComponent', () => {
  let component: AddEditSubCategoriesComponent;
  let fixture: ComponentFixture<AddEditSubCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditSubCategoriesComponent]
    });
    fixture = TestBed.createComponent(AddEditSubCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
