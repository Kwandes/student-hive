import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DemoService } from '../../shared/services/demo.service';

@Component({
  selector: 'student-hive-user',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  confidentialInfo = '';
  isLoading = false;
  constructor(private readonly demoService: DemoService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.demoService.fetchStudentData().subscribe({
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
