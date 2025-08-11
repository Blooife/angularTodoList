import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<Theme>(this.getStoredTheme());

  theme$ = this.themeSubject.asObservable();

  private getStoredTheme(): Theme {
    const stored = localStorage.getItem('app-theme');
    return stored === 'dark' ? 'dark' : 'light';
  }

  setTheme(theme: Theme) {
    localStorage.setItem('app-theme', theme);
    this.themeSubject.next(theme);
    this.applyTheme(theme);
  }

  applyTheme(theme: Theme) {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }

  initTheme() {
    const theme = this.getStoredTheme();
    console.log(theme)
    this.applyTheme(theme);
    this.themeSubject.next(theme);
  }
}
