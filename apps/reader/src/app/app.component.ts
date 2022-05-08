import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IClassroom, ILecture, IUser, Role } from '@student-hive/interfaces';
import { AttendancesService } from './shared/services/attendance.service';
import { AuthService } from './shared/services/auth.service';
import { LecturesService } from './shared/services/lectures.service';
import { ReadersService } from './shared/services/readers.service';
import { UsersService } from './shared/services/users.service';

@Component({
  selector: 'student-hive-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  students: IUser[] = [];
  readers: { classroom?: IClassroom; mac: string }[] = [];
  lectures: ILecture[] = [];
  isLoading = false;
  scanCard = false;
  error = false;
  success = false;
  form!: FormGroup;
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly readersService: ReadersService,
    private readonly attendanceService: AttendancesService,
    private readonly lecturesService: LecturesService
  ) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      student: new FormControl('', [Validators.required]),
      reader: new FormControl('', [Validators.required]),
      lecture: new FormControl('', [Validators.required]),
    });
    this.loginAsAdminAndFetchData();
  }

  /**
   * byupassing authentication requirements, let's goo.
   */
  loginAsAdminAndFetchData() {
    this.isLoading = true;
    this.authService
      .login({ email: 'admin@example.com', password: 'abcDEF123' })
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log('Reader authenticated as admin');

          this.authService.saveAccessInfo({
            accessToken: response.accessToken,
            role: response.role,
          });
          this.fetchAllStudents();
          this.fetchAllReaders();
          this.fetchAllLectures();
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this.isLoading = false;
          alert(
            `Failed to authenticate as the reader. Can't do anything, sorry`
          );
        },
      });
  }

  fetchAllStudents(): void {
    this.isLoading = true;
    this.usersService.getAll().subscribe({
      next: async (users: IUser[]) => {
        this.students = users.filter(
          (user) => user.authUser.role === Role.student
        );
        await new Promise((f) => setTimeout(f, 1500));
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.isLoading = false;
        alert(`Failed to load readers: ${err.error.message}`);
      },
    });
  }

  fetchAllLectures(): void {
    this.isLoading = true;
    this.lecturesService.getAll().subscribe({
      next: async (lectures: ILecture[]) => {
        this.lectures = lectures;
        await new Promise((f) => setTimeout(f, 1500));
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.isLoading = false;
        alert(`Failed to load lectures: ${err.error.message}`);
      },
    });
  }

  fetchAllReaders(): void {
    this.isLoading = true;
    this.readersService.getAll().subscribe({
      next: async (readers) => {
        // filter out unassigned readers and store them
        this.readers = readers.filter((reader) => reader.classroom);
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.isLoading = false;
        alert(`Failed to load readers: ${err.error.message}`);
      },
    });
  }

  isFormValid(): boolean {
    return this.form.dirty && this.form.valid;
  }

  async registerAttendance() {
    console.log('Chosen student', this.form.value);
    this.isLoading = true;
    this.scanCard = true;
    this.attendanceService
      .create({
        authUserId: this.form.value?.student.authUserId,
        lectureId: this.form.value.lecture.lectureId,
      })
      .subscribe({
        next: async () => {
          await new Promise((f) => setTimeout(f, 2000));
          this.scanCard = false;
          this.isLoading = false;
          this.success = true;
          await new Promise((f) => setTimeout(f, 2000));
          alert(`Attendance registered`);
          this.success = false;
        },
        error: async (err: HttpErrorResponse) => {
          console.error(err);
          await new Promise((f) => setTimeout(f, 2000));
          this.scanCard = false;
          this.isLoading = false;
          this.error = true;
          await new Promise((f) => setTimeout(f, 2000));
          alert(`Failed to register attendance: ${err.error.message}`);
          this.error = false;
        },
      });
  }
}
