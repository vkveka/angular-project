import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../services/user.service';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserContext } from '../user-context/user-context';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss'
})
export class UserProfile implements OnInit {
  user: User | null = null;

  updateForm!: FormGroup;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.updateForm = this.fb.group({
      name: [this.user?.name || ''],
      email: [this.user?.email || '', [Validators.email]],
      password: [''],
    });
  }

  showModalDelete = false;
  showModalUpdate = false;

  ngOnInit(): void {
    this.userService.getBddUser().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err) => console.error('Error fetching user data', err)
    });
  }

  onDelete() {
    this.showModalDelete = true;
  }

  confirmDelete() {
    if (this.user) {
      this.userService.removeUser().subscribe({
        next: () => {
          console.log('User deleted successfully');
          this.authService.logout();
          this.router.navigate(['/login']);
          this.showModalDelete = false;
        },
        error: (err) => console.error('Error deleting user', err),
      });
    } else {
      console.error('No user to delete');
    }
  }

  cancelDelete(): void {
    this.showModalDelete = false;
  }




  onUpdate() {
    if (this.user) {
      this.updateForm.reset({
        name: this.user.name || '',
        email: this.user.email || '',
        password: '',
      });
    }
    this.showModalUpdate = true;
  }

  cancelUpdate(): void {
    this.showModalUpdate = false;
    this.updateForm.reset();
  }

  confirmUpdate(): void {
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
