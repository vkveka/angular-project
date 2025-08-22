import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

export interface User {
  id?: number;
  name?: string;
  email?: string;
}

@Component({
  selector: 'app-main-content',
  imports: [],
  templateUrl: './main-content.html',
  styleUrl: './main-content.scss'
})
export class MainContent {
  user: User | null = null;

  constructor(private userService: UserService) {
    this.userService.getBddUser().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err) => console.error('Error fetching user data', err)
    });
  }
}
