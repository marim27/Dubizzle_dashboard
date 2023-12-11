import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SelectedCategoryServiceService {
  private selectedCategoryId: string = '';

  constructor() {}

  setSelectedCategoryId(categoryId: string) {
    this.selectedCategoryId = categoryId;
    // console.log(categoryId);
    
  }

  getSelectedCategoryId(): string {
    return this.selectedCategoryId;
  }
}
