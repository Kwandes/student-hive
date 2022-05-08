import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateClassroomRequest, IClassroom } from '@student-hive/interfaces';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClassroomsService {
  constructor(private http: HttpClient) {}
  /**
   * Fetch all classrooms.
   * @returns a list of all classrooms as an observable.
   */
  public getAll(): Observable<IClassroom[]> {
    return this.http.get<IClassroom[]>(`${env.apiUrl}/api/classrooms`);
  }

  /**
   * Fetch specific classroom.
   * @param id id of the classroom.
   * @returns the classroom as an observable.
   */
  public getOne(id: string): Observable<IClassroom> {
    return this.http.get<IClassroom>(`${env.apiUrl}/api/classrooms/${id}`);
  }

  /**
   * Update classroom by id.
   * @param params ( CreateClassroomRequest )
   * @returns the updated classroom as an observable.
   */
  public update(
    params: CreateClassroomRequest,
    id: string
  ): Observable<IClassroom> {
    return this.http.put<IClassroom>(
      `${env.apiUrl}/api/classrooms/${id}`,
      params
    );
  }

  /**
   * Create classroom.
   * @param params ( CreateClassroomRequest )
   * @returns the created classroom as an observable.
   */
  public create(params: CreateClassroomRequest): Observable<IClassroom> {
    return this.http.post<IClassroom>(`${env.apiUrl}/api/classrooms`, params);
  }

  /**
   * Delete specific classroom. Won't delete auth classroom info.
   * @param id id of the classroom.
   */
  public perish(id: string): Observable<void> {
    return this.http.delete<void>(`${env.apiUrl}/api/classrooms/${id}`);
  }
}
