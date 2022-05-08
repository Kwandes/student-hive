import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IClass, UpdateUserRequest } from '@student-hive/interfaces';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  constructor(private http: HttpClient) {}

  /**
   * Fetch the currently authenticted class.
   * @returns the class as an observable.
   */
  public getMe(): Observable<IClass> {
    return this.http.get<IClass>(`${env.apiUrl}/api/classes/me`);
  }

  /**
   * Update currently authenticated class.
   * @param params class information.
   * @returns the updated class as an observable.
   */
  public updateMe(params: UpdateUserRequest): Observable<IClass> {
    return this.http.put<IClass>(`${env.apiUrl}/api/classes`, params);
  }

  /**
   * Update class by id.
   * @param params ( UpdateUserRequest )
   * @returns the updated class as an observable.
   */
  public updateById(params: UpdateUserRequest, id: string): Observable<IClass> {
    return this.http.put<IClass>(`${env.apiUrl}/api/classes/${id}`, params);
  }

  /**
   * Fetch all classes.
   * @returns a list of all classes as an observable.
   */
  public getAll(): Observable<IClass[]> {
    return this.http.get<IClass[]>(`${env.apiUrl}/api/classes`);
  }

  /**
   * Fetch specific class.
   * @param id id of the class.
   * @returns the class as an observable.
   */
  public getOne(id: string): Observable<IClass> {
    return this.http.get<IClass>(`${env.apiUrl}/api/classes/${id}`);
  }

  /**
   * Delete specific class. Won't delete auth class info.
   * @param id id of the class.
   */
  public perish(id: string): Observable<void> {
    return this.http.delete<void>(`${env.apiUrl}/api/classes/${id}`);
  }
}
