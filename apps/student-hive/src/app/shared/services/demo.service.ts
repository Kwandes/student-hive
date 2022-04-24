import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMessage } from '@student-hive/interfaces';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';

const httpOptions = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class DemoService {
  constructor(private http: HttpClient) {}

  /**
   * Fetch students confidential data;
   * @returns observable of the API request
   */
  fetchStudentData(): Observable<IMessage> {
    return this.http.get<IMessage>(
      `${env.apiUrl}/api/auth/student`,
      httpOptions
    );
  }

  /**
   * Fetch teachers confidential data;
   * @returns observable of the API request
   */
  fetchTeacherData(): Observable<IMessage> {
    return this.http.get<IMessage>(
      `${env.apiUrl}/api/auth/teacher`,
      httpOptions
    );
  }
}
