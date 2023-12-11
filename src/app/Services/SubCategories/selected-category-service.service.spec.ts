import { TestBed } from '@angular/core/testing';

import { SelectedCategoryServiceService } from './selected-category-service.service';

describe('SelectedCategoryServiceService', () => {
  let service: SelectedCategoryServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedCategoryServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
