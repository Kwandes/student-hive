import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateLectureRequest, ILecture } from '@student-hive/interfaces';
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
  /**
   * Fetch all lectures.
   * @returns a list of all lectures as an observable.
   */
  public getAllByClass(id: string): Observable<ILecture[]> {
    return this.http.get<ILecture[]>(
      `${env.apiUrl}/api/lectures?classId=${id}`
    );
  }

  /**
   * Fetch specific lecture.
   * @param id id of the lecture.
   * @returns the lecture as an observable.
   */
  public getOne(id: string): Observable<ILecture> {
    return this.http.get<ILecture>(`${env.apiUrl}/api/lectures/${id}`);
  }

  /**
   * Update lecture by id.
   * @param params ( CreateLectureRequest )
   * @returns the updated lecture as an observable.
   */
  public update(
    params: CreateLectureRequest,
    id: string
  ): Observable<ILecture> {
    return this.http.put<ILecture>(`${env.apiUrl}/api/lectures/${id}`, params);
  }

  /**
   * Create lecture.
   * @param params ( CreateLectureRequest )
   * @returns the created lecture as an observable.
   */
  public create(params: CreateLectureRequest): Observable<ILecture> {
    return this.http.post<ILecture>(`${env.apiUrl}/api/lectures`, params);
  }

  /**
   * Delete specific lecture. Won't delete auth lecture info.
   * @param id id of the lecture.
   */
  public perish(id: string): Observable<void> {
    return this.http.delete<void>(`${env.apiUrl}/api/lectures/${id}`);
  }
}
