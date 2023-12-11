import { TestBed } from '@angular/core/testing';

import { SubCategoriesServicesService } from './sub-categories-services.service';

describe('SubCategoriesServicesService', () => {
  let service: SubCategoriesServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubCategoriesServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
