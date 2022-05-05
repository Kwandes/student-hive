import { Component } from '@angular/core';
@Component({
  selector: 'student-hive-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class AdminDashboardComponent {
  slides = [
    {
      text: 'Class Management',
      link: '../classes',
    },
    {
      text: 'User Management',
      link: '../users',
    },
    {
      text: 'Device Management',
      link: '../devices',
    },
    {
      text: 'Statistics',
      link: '../stats',
    },
  ];
}
