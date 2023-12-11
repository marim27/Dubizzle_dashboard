import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationGeneratorComponent } from './location-generator.component';

describe('LocationGeneratorComponent', () => {
  let component: LocationGeneratorComponent;
  let fixture: ComponentFixture<LocationGeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationGeneratorComponent]
    });
    fixture = TestBed.createComponent(LocationGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
