import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IClassroom } from '@student-hive/interfaces';
import { Observable, of } from 'rxjs';

const httpOptions = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

interface IReader {
  readerId: string;
  mac: string;
  status: string;
  isEnabled: boolean;
  classroom?: IClassroom;
}

const mockClassrooms: IClassroom[] = [
  {
    classroomId: '4dd17881-3ad2-4a35-a9b6-79703addae8c',
    name: 'GBG.E248',
  },
  {
    classroomId: 'af6b0787-906d-499b-ac7f-c84aceaab185',
    name: 'GBG.A301',
  },
  {
    classroomId: 'd62f1a08-b3f7-420a-9d7e-7961d2ee79d4',
    name: 'GBG.C235',
  },
  {
    classroomId: '8ffdbc6f-6d87-486b-a469-c1582e4aa3ed',
    name: 'GBG.B237',
  },
  {
    classroomId: '43ecdb13-8deb-4769-aa5a-a15136280848',
    name: 'GBG.D281',
  },
];

const mockReaders: IReader[] = [
  {
    readerId: '1e39a9d6-a3f9-420b-8f13-aef7910faaa2',
    mac: '65:D4:63:68:5C:AC',
    status: 'connected',
    isEnabled: true,
  },
  {
    readerId: '4e17184b-7e89-42be-8254-2a0951599a86',
    mac: 'CB:3A:74:24:10:49',
    status: 'connected',
    isEnabled: true,
  },
  {
    readerId: '53ac0a33-ae7f-4110-91dc-4a0ea5e20e12',
    mac: 'CD:EE:83:80:85:F4',
    status: 'connected',
    isEnabled: true,
    classroom: mockClassrooms[0],
  },
  {
    readerId: 'a2dcbe16-822a-44f0-bad4-5b91d3c62a0a',
    mac: '27:0E:15:73:F0:BB',
    status: 'connected',
    isEnabled: true,
    classroom: mockClassrooms[1],
  },
  {
    readerId: '4d364838-4424-4186-bd1f-771d5efc33ee',
    mac: '7A:07:D4:CA:8B:55',
    status: 'connected',
    isEnabled: true,
    classroom: mockClassrooms[2],
  },
  {
    readerId: '613ae781-2c09-4ff6-8d01-e315915354c8',
    mac: '10:FF:6B:EA:57:83',
    status: 'connected',
    isEnabled: true,
    classroom: mockClassrooms[3],
  },
  {
    readerId: '6f878183-c5b4-4375-8d3d-1e8efee66b85',
    mac: 'CF:11:4E:B4:8B:F1',
    status: 'connected',
    isEnabled: true,
    classroom: mockClassrooms[4],
  },
];

@Injectable({
  providedIn: 'root',
})
export class ReadersService {
  constructor(private http: HttpClient) {}
  /**
   * Fetch all readers.
   * @returns a list of all readers as an observable.
   */
  public getAll(): Observable<IReader[]> {
    console.warn('WiP - mock data');
    return of(mockReaders);
    // return this.http.get<IReader[]>(`${env.apiUrl}/api/readers`);
  }

  /**
   * Fetch specific reader.
   * @param id id of the reader.
   * @returns the reader as an observable.
   */
  public getOne(id: string): Observable<IReader> {
    console.warn('WiP - mock data');
    return of(
      mockReaders.find((reader) => reader.readerId === id) || mockReaders[0]
    );
    // return this.http.get<IReader>(`${env.apiUrl}/api/readers/${id}`);
  }

  /**
   * Update reader by id.
   * @param params ( CreateReaderRequest )
   * @returns the updated reader as an observable.
   */
  public update(
    params: { classroomId: string; status: string },
    id: string
  ): Observable<IReader> {
    console.warn('WiP - mock data. Nothing got changed');
    return of(
      mockReaders.find((reader) => reader.readerId === id) || mockReaders[0]
    );
    // return this.http.put<IReader>(`${env.apiUrl}/api/readers/${id}`, params);
  }

  /**
   * Create reader.
   * @param params ( CreateReaderRequest )
   * @returns the created reader as an observable.
   */
  public create(params: { wip: string }): Observable<IReader> {
    console.warn('WiP - mock data. Nothing got changed');
    return of({
      readerId: '',
      mac: 'WiP:TBD:FINISH:ME',
      status: 'mocked',
      isEnabled: false,
    });
    // return this.http.post<IReader>(`${env.apiUrl}/api/readers`, params);
  }

  /**
   * Delete specific reader. Won't delete auth reader info.
   * @param id id of the reader.
   */
  public perish(id: string): Observable<void> {
    console.warn('WiP - mock data. Nothing got changed');
    return of();
    // return this.http.delete<void>(`${env.apiUrl}/api/readers/${id}`);
  }
}
