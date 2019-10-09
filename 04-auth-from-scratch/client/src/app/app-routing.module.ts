import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LoggedInTokenRedirect } from './_helpers/login-redirect.auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRedirect } from './_helpers/dashboard.auth.guard';
import { AdminCheck } from './_helpers/admin-check.auth.guard';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [ LoggedInTokenRedirect ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ LoggedInTokenRedirect ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [ DashboardRedirect ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [ LoggedInTokenRedirect ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ LoggedInTokenRedirect ]
})
export class AppRoutingModule { }
