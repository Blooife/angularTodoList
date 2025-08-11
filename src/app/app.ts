import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './components/header.component/header.component';
import {ThemeService} from './services/theme.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent,FontAwesomeModule],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App implements OnInit {

  constructor(private themeService: ThemeService) {
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.themeService.initTheme();
  }
}
