import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ThemeToggleComponent} from '../theme-toggle.component/theme-toggle.component';
import {GithubUserComponent} from '../github-user.component/github-user.component';

@Component({
  selector: 'app-settings.component',
  imports: [
    FormsModule,
    ThemeToggleComponent,
    GithubUserComponent
  ],
  templateUrl: './settings.component.html',
  standalone: true,
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

}
