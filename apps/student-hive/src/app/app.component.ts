import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Message } from '@student-hive/interfaces';
import { environment as env } from '../environments/environment';

@Component({
  selector: 'student-hive-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  hello$ = this.http.get<Message>(`${env.apiUrl}/api/hello`);
  constructor(private http: HttpClient) {}
}
