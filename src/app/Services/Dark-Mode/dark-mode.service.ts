import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  isDarkMode = false;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.setTheme();
  }

  setTheme() {
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode'); 
    } else {
      document.body.classList.remove('dark-mode'); 
    }
  }
  
}
