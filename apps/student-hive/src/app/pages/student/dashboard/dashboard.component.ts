import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IAttendance, IClass, ILecture, IUser } from '@student-hive/interfaces';
import { AttendancesService } from '../../../shared/services/attendance.service';
import { LecturesService } from '../../../shared/services/lectures.service';
import { UsersService } from '../../../shared/services/users.service';

@Component({
  selector: 'student-hive-student-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class StudentDashboardComponent implements OnInit {
  user?: IUser;
  classes: IClass[] = [];
  lectures: ILecture[] = [];
  upcomingLectures: ILecture[] = [];
  attendances: IAttendance[] = [];
  isLoading = false;

  constructor(
    private snackBar: MatSnackBar,
    private readonly usersService: UsersService,
    private readonly lecturesService: LecturesService,
    private readonly attendancesService: AttendancesService
  ) {}

  ngOnInit(): void {
    this.fetchCurrentUser();
  }

  fetchCurrentUser(): void {
    this.isLoading = true;
    this.usersService.getMe().subscribe({
      next: async (user: IUser) => {
        this.user = user;
        await new Promise((f) => setTimeout(f, 1500));
        this.isLoading = false;
        this.classes = this.user.classes;
        this.fetchLectures();
        this.fetchUsersAttendances();
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

  fetchLectures() {
    if (this.user && this.user.classes) {
      // eslint-disable-next-line no-unsafe-optional-chaining
      for (const clæss of this.user?.classes) {
        this.lecturesService.getAllByClass(clæss.classId).subscribe({
          next: (lectures) => {
            this.lectures = this.lectures.concat(lectures);
            this.setUpcomingLectures();
          },
          error: (err: HttpErrorResponse) => {
            console.error(err);
            this.isLoading = false;
            this.snackBar.open(
              `Failed to load lectures: ${err.error.message}`,
              'OH NO WHAT HAPPENED TO THEM!!'
            );
          },
        });
      }
    }
  }

  fetchUsersAttendances() {
    // eslint-disable-next-line no-unsafe-optional-chaining
    this.attendancesService.getAllofMine().subscribe({
      next: (attendances) => {
        this.attendances = attendances;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.isLoading = false;
        this.snackBar.open(
          `Failed to load attendances: ${err.error.message}`,
          'OH NO WHAT HAPPENED TO THEM!!'
        );
      },
    });
  }

  setUpcomingLectures(): void {
    const weekAwayDate = new Date();
    weekAwayDate.setDate(new Date().getDate() + 7);

    this.upcomingLectures = this.lectures.filter(
      (lecture) =>
        new Date(lecture.start).toISOString() > new Date().toISOString() &&
        new Date(lecture.start).toISOString() < weekAwayDate.toISOString()
    );
  }

  getFormattedDate(date : Date ):string {
    return date?.getDay()?.toString(); 
  }



}
