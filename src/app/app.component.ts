import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { AuthService } from './services/auth.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatButton, CommonModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  public logout(): void {
    const users = this.authService.getUsers();
    // TODO: Move to service
    users.map((user) => {
      if (user.login === this.authService.activeUser?.login) {
        user.isAuth = false;
      }
    })
    window.localStorage.setItem('users', JSON.stringify(users));

    this.router.navigateByUrl('auth/login');
    this.authService.activeUser = null;
    this.authService.isAuth$.next(false);
  }
}
