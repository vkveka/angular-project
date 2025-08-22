import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserContext } from '../user-context/user-context';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, UserContext, ThemeToggleComponent],
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  auth = inject(AuthService);
  router = inject(Router);
  isAuthenticated: boolean = false;

  constructor() {
    this.isAuthenticated = this.auth.isAuthenticated();
  }

  onLogout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
