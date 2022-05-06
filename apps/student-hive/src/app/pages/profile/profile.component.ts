import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IUser, Role } from '@student-hive/interfaces';
import { AuthService } from '../../shared/services/auth.service';
import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'student-hive-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user?: IUser = undefined;
  viewingThemselves = false;
  isLoading = false;

  constructor(
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  ngOnInit(): void {
    if (this.router.url === '/profile') {
      this.fetchCurrentUser();
      this.viewingThemselves = true;
    } else {
      const splitUrl = this.router.url.split('/');
      // get the used ID and remove any query parameters
      const isolatedUserId = splitUrl[splitUrl.length - 1].split('?')[0];
      this.fetchById(isolatedUserId);
    }
  }

  fetchById(id: string): void {
    this.isLoading = true;
    this.usersService.getOne(id).subscribe({
      next: async (user: IUser) => {
        this.user = user;
        await new Promise((f) => setTimeout(f, 1500));
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.isLoading = false;
        this.snackBar.open(
          `Failed to load user: ${err.error.message}`,
          'OH NO WHAT HAPPENED TO THEM!!'
        );
      },
    });
  }

  fetchCurrentUser(): void {
    this.isLoading = true;
    this.usersService.getMe().subscribe({
      next: async (user: IUser) => {
        this.user = user;
        await new Promise((f) => setTimeout(f, 1500));
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.isLoading = false;
        this.snackBar.open(
          `Failed to load user: ${err.error.message}`,
          'OH NO WHAT HAPPENED TO THEM!!'
        );
      },
    });
  }

  perish(): void {
    if (!this.user || !this.user.authUser) {
      return;
    }
    this.isLoading = true;
    this.authService.perish(this.user?.authUser.authUserId).subscribe({
      next: async () => {
        await new Promise((f) => setTimeout(f, 1000));
        this.isLoading = false;
        if (this.viewingThemselves) {
          this.authService.logout();
        }
        this.router.navigate(['']);
        // Refresh the list
        this.snackBar.open(
          `${this.user?.authUser.email} is with us no more`,
          'F',
          {
            duration: 10000,
          }
        );
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.isLoading = false;
        this.snackBar.open(
          `Failed to delete user: ${err.error.message}`,
          'I WANT THEM GONE!'
        );
      },
    });
  }

  /**
   * Get text styling class based on user role.
   * @param role user role.
   */
  getRoleClass(): string {
    switch (this.user?.authUser.role) {
      case Role.student: {
        return 'role-student';
      }
      case Role.teacher: {
        return 'role-teacher';
      }
      case Role.admin: {
        return 'role-admin';
      }
      default: {
        return 'role-student';
      }
    }
  }
}
