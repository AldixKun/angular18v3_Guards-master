import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  standalone: true,
  selector: 'app-login',
  template: `
    <h2>Login</h2>
    <form (ngSubmit)="login()">
      <input [(ngModel)]="user" name="user" placeholder="User">
      <input [(ngModel)]="pass" name="pass" type="password" placeholder="Password">
      <button type="submit">Login</button>
    </form>
  `,
  imports: [FormsModule]
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  user = '';
  pass = '';

  login() {
    this.auth.login(this.user, this.pass);
    if (this.auth.isLoggedIn()) this.router.navigateByUrl('/users');
  }
}

