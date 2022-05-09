import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateAttendanceRequest, IAttendance } from '@student-hive/interfaces';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AttendancesService {
  constructor(private http: HttpClient) {}
  /**
   * Fetch all attendances.
   * @returns a list of all attendances as an observable.
   */
  public getAll(): Observable<IAttendance[]> {
    return this.http.get<IAttendance[]>(`${env.apiUrl}/api/attendances`);
  }

  /**
   * Fetch all attendances of currently authenticated user.
   * @returns a list of all attendances as an observable.
   */
  public getAllofMine(): Observable<IAttendance[]> {
    return this.http.get<IAttendance[]>(`${env.apiUrl}/api/attendances/me`);
  }

  /**
   * Fetch specific attendance.
   * @param id id of the attendance.
   * @returns the attendance as an observable.
   */
  public getOne(id: string): Observable<IAttendance> {
    return this.http.get<IAttendance>(`${env.apiUrl}/api/attendances/${id}`);
  }

  /**
   * Update attendance by id.
   * @param params ( CreateAttendanceRequest )
   * @returns the updated attendance as an observable.
   */
  public update(
    params: CreateAttendanceRequest,
    id: string
  ): Observable<IAttendance> {
    return this.http.put<IAttendance>(
      `${env.apiUrl}/api/attendances/${id}`,
      params
    );
  }

  /**
   * Create attendance.
   * @param params ( CreateAttendanceRequest )
   * @returns the created attendance as an observable.
   */
  public create(params: CreateAttendanceRequest): Observable<IAttendance> {
    return this.http.post<IAttendance>(`${env.apiUrl}/api/attendances`, params);
  }

  /**
   * Delete specific attendance. Won't delete auth attendance info.
   * @param id id of the attendance.
   */
  public perish(id: string): Observable<void> {
    return this.http.delete<void>(`${env.apiUrl}/api/attendances/${id}`);
  }
}
