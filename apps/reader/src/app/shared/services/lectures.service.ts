import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILecture } from '@student-hive/interfaces';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LecturesService {
  constructor(private http: HttpClient) {}

  /**
   * Fetch all lectures.
   * @returns a list of all lectures as an observable.
   */
  public getAll(): Observable<ILecture[]> {
    return this.http.get<ILecture[]>(`${env.apiUrl}/api/lectures`);
  }
}
