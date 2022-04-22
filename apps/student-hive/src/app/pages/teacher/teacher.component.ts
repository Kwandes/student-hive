import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DemoService } from '../../shared/services/demo.service';

@Component({
  selector: 'student-hive-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css'],
})
export class TeacherComponent implements OnInit {
  confidentialInfo = '';
  isLoading = false;
  constructor(private readonly demoService: DemoService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.demoService.fetchTeacherData().subscribe({
      next: (response) => {
        this.confidentialInfo = response.message;
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.isLoading = false;
      },
    });
  }
}
