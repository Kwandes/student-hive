import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser, UpdateUserRequest } from '@student-hive/interfaces';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  /**
   * Fetch the currently authenticted user.
   * @returns the user as an observable.
   */
  public getMe(): Observable<IUser> {
    return this.http.get<IUser>(`${env.apiUrl}/api/users/me`);
  }

  /**
   * Update currently authenticated user.
   * @param params user information.
   * @returns the updated user as an observable.
   */
  public updateMe(params: UpdateUserRequest): Observable<IUser> {
    return this.http.put<IUser>(`${env.apiUrl}/api/users`, params);
  }

  /**
   * Update user by id.
   * @param params ( UpdateUserRequest )
   * @returns the updated user as an observable.
   */
  public updateById(params: UpdateUserRequest, id: string): Observable<IUser> {
    return this.http.put<IUser>(`${env.apiUrl}/api/users/${id}`, params);
  }

  /**
   * Fetch all users.
   * @returns a list of all users as an observable.
   */
  public getAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${env.apiUrl}/api/users`);
  }

  /**
   * Fetch specific user.
   * @param id id of the user.
   * @returns the user as an observable.
   */
  public getOne(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${env.apiUrl}/api/users/${id}`);
  }

  /**
   * Delete specific user. Won't delete auth user info.
   * @param id id of the user.
   */
  public perish(id: string): Observable<void> {
    return this.http.delete<void>(`${env.apiUrl}/api/users/${id}`);
  }
}
