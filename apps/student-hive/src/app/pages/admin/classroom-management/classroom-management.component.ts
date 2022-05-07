import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IClassroom } from '@student-hive/interfaces';
import { ClassroomsService } from '../../../shared/services/classrooms.service';
import { ReadersService } from '../../../shared/services/readers.service';

@Component({
  selector: 'student-hive-admin-stats',
  templateUrl: './classroom-management.component.html',
  styleUrls: ['./classroom-management.component.scss'],
})
export class ClassroomManagementComponent implements OnInit {
  classroomsList: IClassroom[] = [];
  readers: { classroom?: IClassroom; mac: string }[] = [];
  availableReaders: { classroom?: IClassroom; mac: string }[] = [];
  isLoading = false;
  displayedColumns: string[] = ['name', 'reader', 'actions'];

  constructor(
    private snackBar: MatSnackBar,
    private readonly classroomsService: ClassroomsService,
    private readonly readersService: ReadersService
  ) {}
  ngOnInit(): void {
    this.fetchAllClassRooms();
    this.fetchAllReaders();
  }

  fetchAllClassRooms(): void {
    this.isLoading = true;
    this.classroomsService.getAll().subscribe({
      next: async (classrooms: IClassroom[]) => {
        this.classroomsList = classrooms;
        await new Promise((f) => setTimeout(f, 1500));
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.isLoading = false;
        this.snackBar.open(
          `Failed to load classrooms: ${err.error.message}`,
          'OH NO WHAT HAPPENED TO THEM!!'
        );
      },
    });
  }

  fetchAllReaders(): void {
    this.isLoading = true;
    this.readersService.getAll().subscribe({
      next: async (readers) => {
        this.readers = readers;
        await new Promise((f) => setTimeout(f, 1500));
        this.isLoading = false;
        this.setAvailableReaders();
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.isLoading = false;
        this.snackBar.open(
          `Failed to load readers: ${err.error.message}`,
          'OH NO WHAT HAPPENED TO THEM!!'
        );
      },
    });
  }

  updateReader(readerId: string, newClassroomId: string): void {
    this.isLoading = true;
    this.readersService
      .update({ classroomId: newClassroomId, status: 'UPDATE ME' }, readerId)
      .subscribe({
        next: async () => {
          // await new Promise((f) => setTimeout(f, 1000));
          this.isLoading = false;
          // Refresh the list
          this.fetchAllReaders();
          this.fetchAllClassRooms();
          // TODO - properly update stuff once readers get implemented
          this.snackBar.open('The classroom has been updated', 'Yay', {
            duration: 10000,
          });
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this.isLoading = false;
          this.snackBar.open(
            `Failed to update classroom: ${err.error.message}`,
            'LEMME USE A DIFFERENT READER!'
          );
        },
      });
  }

  perish(id: string): void {
    this.isLoading = true;
    this.classroomsService.perish(id).subscribe({
      next: async () => {
        // await new Promise((f) => setTimeout(f, 1000));
        this.isLoading = false;
        // Refresh the list
        this.fetchAllClassRooms();
        this.fetchAllReaders();
        this.snackBar.open('The class has been demolished', 'F', {
          duration: 10000,
        });
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.isLoading = false;
        this.snackBar.open(
          `Failed to delete classroom: ${err.error.message}`,
          'I WANT IT GONE!'
        );
      },
    });
  }

  getClassroomsAssignedReader(classroom: IClassroom) {
    return this.readers.find(
      (reader) => reader?.classroom?.classroomId === classroom.classroomId
    );
  }

  /**
   * Filter the reader list for the ones that have no classroom associated with them.
   */
  setAvailableReaders() {
    this.availableReaders = this.readers.filter(
      (reader) => reader.classroom === undefined
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  changeClassroomsReader($event: any, classroomId: string) {
    this.updateReader($event.value.readerId, classroomId);
  }
}
