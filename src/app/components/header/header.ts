import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
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
