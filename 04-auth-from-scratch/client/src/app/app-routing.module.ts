import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LoggedInTokenRedirect } from './_helpers/login-redirect.auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRedirect } from './_helpers/dashboard.auth.guard';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ LoggedInTokenRedirect ]
})
export class AppRoutingModule { }
