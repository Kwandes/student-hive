import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Role } from '@student-hive/interfaces';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminDashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SignupComponent } from './pages/signup/signup.component';
import { StudentAttendanceComponent } from './pages/student/attendance/attendance.component';
import { StudentClassesComponent } from './pages/student/classes/classes.component';
import { StudentDashboardComponent } from './pages/student/dashboard/dashboard.component';
import { StudentComponent } from './pages/student/student.component';
import { TeacherClassesComponent } from './pages/teacher/classes/classes.component';
import { TeacherDashboardComponent } from './pages/teacher/dashboard/dashboard.component';
import { StudentsListComponent } from './pages/teacher/students-list/students-list.component';
import { TeacherComponent } from './pages/teacher/teacher.component';
import { AuthGuard } from './shared/helpers/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent }, // CookieGuard ensures that the user has accepted cookies
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'student',
    component: StudentComponent,
    canActivate: [AuthGuard],
    data: { role: Role.student },
    children: [
      { path: '', redirectTo: 'dashboard' },
      { path: 'dashboard', component: StudentDashboardComponent },
      { path: 'classes', component: StudentClassesComponent },
      { path: 'attendance', component: StudentAttendanceComponent },
    ],
  },
  {
    path: 'teacher',
    component: TeacherComponent,
    canActivate: [AuthGuard],
    data: { role: Role.teacher },
    children: [
      { path: '', redirectTo: 'dashboard' },
      { path: 'dashboard', component: TeacherDashboardComponent },
      { path: 'classes', component: TeacherClassesComponent },
      { path: 'students', component: StudentsListComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { role: Role.admin },
    children: [
      { path: '', redirectTo: 'dashboard' },
      { path: 'dashboard', component: AdminDashboardComponent },
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: 'home' }, // Redirect to home page
  { path: '**', component: PageNotFoundComponent }, // PageNotFound for all other page requests
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
