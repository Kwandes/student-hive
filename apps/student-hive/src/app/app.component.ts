import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ILoginResponse, IMessage } from '@student-hive/interfaces';
import { LocalStorageService, LocalStorageVars } from '@local-storage';
import { environment as env } from '../environments/environment';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'student-hive-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  loggedInCheckInterval!: number;
  hello$ = this.http.get<IMessage>(`${env.apiUrl}/api/hello`);
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn =
      this.localStorageService.getItem<ILoginResponse>(
        LocalStorageVars.accessTokenInfo
      )?.value != null;
    // periodically check the logged in status.
    // I techncially could subscribe to local storage but angular strict rules are making it n annoying process so I went with this meh approach.
    this.loggedInCheckInterval = window.setInterval(() => {
      this.isLoggedIn =
        this.localStorageService.getItem<ILoginResponse>(
          LocalStorageVars.accessTokenInfo
        )?.value != null;
    }, 5000);
  }

  ngOnDestroy(): void {
    clearInterval(this.loggedInCheckInterval);
  }

  /**
   * Logout the user.
   */
  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
  }
}
