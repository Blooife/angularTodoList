import {Component, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {GithubUser} from '../../models/GithubUser';

@Component({
  selector: 'github-user',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './github-user.component.html',
  standalone: true,
  styleUrl: './github-user.component.css'
})
export class GithubUserComponent {
  searchControl = new FormControl('');
  user: GithubUser | null = null;
  notFound = false;

  constructor(private http: HttpClient) {
  }

  search() {
    if(this.searchControl.value){

      const username = this.searchControl.value.trim();

      if (!username) {
        this.user = null;
        this.notFound = false;
        return;
      }

      this.http.get<GithubUser>(`https://api.github.com/users/${username}`)
        .subscribe({
          next: user => {
            this.user = user;
            this.notFound = false;
          },
          error: () => {
            this.user = null;
            this.notFound = true;
          }
        });
    }
  }
}

