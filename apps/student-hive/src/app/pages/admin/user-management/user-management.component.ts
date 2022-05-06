import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser, Role } from '@student-hive/interfaces';
import { AuthService } from '../../../shared/services/auth.service';
import { UsersService } from '../../../shared/services/users.service';

@Component({
  selector: 'student-hive-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  usersList: IUser[] = [];
  isLoading = false;
  displayedColumns: string[] = [
    'email',
    'name',
    'birthdate',
    'role',
    'actions',
  ];

  constructor(
    private snackBar: MatSnackBar,
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {}
  ngOnInit(): void {
    this.fetchAll();
  }

  fetchAll(): void {
    this.isLoading = true;
    this.usersService.getAll().subscribe({
      next: async (users: IUser[]) => {
        this.usersList = users;
        await new Promise((f) => setTimeout(f, 1500));
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.isLoading = false;
        this.snackBar.open(
          `Failed to load users: ${err.error.message}`,
          'OH NO WHAT HAPPENED TO THEM!!'
        );
      },
    });
  }

  perish(id: string): void {
    this.isLoading = true;
    this.authService.perish(id).subscribe({
      next: async () => {
        // await new Promise((f) => setTimeout(f, 1000));
        this.isLoading = false;
        // Refresh the list
        this.fetchAll();
        this.snackBar.open('This user is with us no more', 'F', {
          duration: 10000,
        });
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
   * Remove time from DateTime object.
   * @param date date-only string.
   */
  stripBirtdate(date: Date): string {
    return new Date(date).toLocaleDateString();
  }

  /**
   * Get text styling class based on user role.
   * @param role user role.
   */
  getRoleClass(role: Role): string {
    switch (role) {
      case Role.student: {
        return 'role-student';
      }
      case Role.teacher: {
        return 'role-teacher';
      }
      case Role.admin: {
        return 'role-admin';
      }
    }
  }
}
