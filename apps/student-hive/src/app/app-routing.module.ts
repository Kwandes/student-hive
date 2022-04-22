import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Role } from '@student-hive/interfaces';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SignupComponent } from './pages/signup/signup.component';
import { StudentComponent } from './pages/student/student.component';
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
  },
  {
    path: 'teacher',
    component: TeacherComponent,
    canActivate: [AuthGuard],
    data: { role: Role.teacher },
  },
  { path: '', pathMatch: 'full', redirectTo: 'home' }, // Redirect to home page
  { path: '**', component: PageNotFoundComponent }, // PageNotFound for all other page requests
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
