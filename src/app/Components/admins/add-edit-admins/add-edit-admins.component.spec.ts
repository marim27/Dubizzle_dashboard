import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAdminsComponent } from './add-edit-admins.component';

describe('AddEditAdminsComponent', () => {
  let component: AddEditAdminsComponent;
  let fixture: ComponentFixture<AddEditAdminsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditAdminsComponent]
    });
    fixture = TestBed.createComponent(AddEditAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
