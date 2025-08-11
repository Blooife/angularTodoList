import {Component} from '@angular/core';
import {GithubUserComponent} from '../github-user.component/github-user.component';
import {FormsModule} from '@angular/forms';
import {ThemeToggleComponent} from '../theme-toggle.component/theme-toggle.component';

@Component({
  selector: 'app-settings.component',
  imports: [
    GithubUserComponent,
    FormsModule,
    ThemeToggleComponent
  ],
  templateUrl: './settings.component.html',
  standalone: true,
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

}
