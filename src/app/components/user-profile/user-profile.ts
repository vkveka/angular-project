import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../services/user.service';
import { Router, RouterLink } from "@angular/router";
import { TokenService } from '../../services/token.service';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss'
})
export class UserProfile implements OnInit {
  user: User | null = null;

  updateForm!: FormGroup;

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  showModalDelete = false;
  showModalUpdate = false;

  ngOnInit(): void {
    this.userService.getBddUser().subscribe(user => {
      this.user = user;
    });
  }

  onDelete() {
    this.showModalDelete = true;
  }

  confirmDelete() {
    if (this.user) {
      this.userService.removeUser().subscribe(() => {
        console.log('User deleted successfully');
        this.tokenService.clearToken();
        this.router.navigate(['/login']);
        this.showModalDelete = false;
      });
    } else {
      console.error('No user to delete');
    }
  }

  cancelDelete(): void {
    this.showModalDelete = false;
  }



  
  onUpdate() {
    this.updateForm = this.fb.group({
      name: [this.user?.name || ''],
      email: [this.user?.email || '', [Validators.email]],
      password: [''],
    });
    this.showModalUpdate = true;
  }

  cancelUpdate(): void {
    this.showModalUpdate = false;
    this.updateForm.reset();
  }

  confirmUpdate() {
    if (this.updateForm.invalid) {
      this.updateForm.markAllAsTouched();
      return;
    }

    const updatedUser: User = {
      ...this.user,
      ...this.updateForm.value
    };

    console.log(this.updateForm.value);

    this.userService.updateUser(updatedUser).subscribe({
      next: (user) => {
        console.log('User updated successfully', user);
        this.user = user;
        this.showModalUpdate = false;
        this.updateForm.reset();
      },
      error: (err) => console.error('Error updating user', err),
    });
  }

}
