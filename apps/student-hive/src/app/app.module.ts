import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgParticlesModule } from 'ng-particles';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { materialModules } from './material-modules.constant';
import { AdminComponent } from './pages/admin/admin.component';
import { ClassManagementComponent } from './pages/admin/class-management/class-management.component';
import { ClassroomManagementComponent } from './pages/admin/classroom-management/classroom-management.component';
import { AdminDashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { DeviceManagementComponent } from './pages/admin/device-management/device-management.component';
import { UserManagementComponent } from './pages/admin/user-management/user-management.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { StudentAttendanceComponent } from './pages/student/attendance/attendance.component';
import { StudentClassesComponent } from './pages/student/classes/classes.component';
import { StudentDashboardComponent } from './pages/student/dashboard/dashboard.component';
import { StudentComponent } from './pages/student/student.component';
import { TeacherClassesComponent } from './pages/teacher/classes/classes.component';
import { TeacherDashboardComponent } from './pages/teacher/dashboard/dashboard.component';
import { StudentsListComponent } from './pages/teacher/students-list/students-list.component';
import { TeacherComponent } from './pages/teacher/teacher.component';
import { CarouselComponent } from './shared/components/carousel/carousel.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { MatrixTerminalComponent } from './shared/components/matrix-terminal/matrix-terminal.component';
import { RadarComponent } from './shared/components/radar/radar.component';
import { TsParticlesComponent } from './shared/components/ts-particles/ts-particles.component';
import { authInterceptorProviders } from './shared/helpers/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    PageNotFoundComponent,
    HomeComponent,
    ProfileComponent,
    // Admin pages
    AdminComponent,
    AdminDashboardComponent,
    UserManagementComponent,
    ClassManagementComponent,
    DeviceManagementComponent,
    ClassroomManagementComponent,
    // Teacher pages
    TeacherComponent,
    TeacherDashboardComponent,
    TeacherClassesComponent,
    StudentsListComponent,
    // Student pages
    StudentComponent,
    StudentDashboardComponent,
    StudentClassesComponent,
    StudentAttendanceComponent,
    // funky components
    TsParticlesComponent,
    RadarComponent,
    MatrixTerminalComponent,
    CarouselComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    materialModules,
    NgParticlesModule,
    BrowserAnimationsModule,
    SlickCarouselModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
