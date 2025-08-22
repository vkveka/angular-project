import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id?: number;
  name?: string;
  email?: string;
}

@Component({
  selector: 'app-user-context',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './user-context.html',
  styleUrl: './user-context.scss'
})
export class UserContext implements OnInit {
  user: User | null = null;
  menuOpen = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.userService.getBddUser().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err) => console.error('Error fetching user data', err)
    });
  }

  toggle() {
    this.menuOpen = !this.menuOpen;
  }

  close() {
    if (this.menuOpen) this.menuOpen = false;
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const inside = target.closest('app-user-context');
    if (!inside) this.close();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
