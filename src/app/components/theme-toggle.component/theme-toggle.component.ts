import { Component } from '@angular/core';
import {Theme, ThemeService} from '../../services/theme.service';

@Component({
  selector: 'theme-toggle',
  imports: [],
  templateUrl: './theme-toggle.component.html',
  standalone: true,
  styleUrl: './theme-toggle.component.css'
})
export class ThemeToggleComponent {
  currentTheme: Theme = 'light';

  constructor(private themeService: ThemeService) {
    this.themeService.theme$.subscribe(theme => this.currentTheme = theme);
  }

  changeTheme(event: Event) {
    const theme = (event.target as HTMLSelectElement).value as Theme;
    this.themeService.setTheme(theme);
  }
}
