import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../services/user.service';
import { Router, RouterLink } from "@angular/router";
import { TokenService } from '../../services/token.service';


@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss'
})
export class UserProfile implements OnInit {
  user: User | null = null;

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router,
  ) { }

  // ngOnInit(): void {
  //   this.user = this.userService.getUser();

  //   this.userService.user$.subscribe(user => {
  //     this.user = user;
  //   });
  // }


  ngOnInit(): void {
    this.userService.getBddUser().subscribe(user => {
      this.user = user;
    });
  }

  onDelete() {
    if (this.user) {
      this.userService.removeUser().subscribe(() => {
        console.log('User deleted successfully');
        this.tokenService.clearToken();
        this.router.navigate(['/login']);
      });
    } else {
      console.error('No user to delete');
    }
  }
}
