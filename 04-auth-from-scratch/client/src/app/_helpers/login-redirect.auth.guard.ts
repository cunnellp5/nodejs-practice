import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot
} from "@angular/router";
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoggedInTokenRedirect implements CanActivate {
    constructor(
        private router: Router,
        // private authenticationService: AuthenticationService
    ) { }
    canActivate(route: ActivatedRouteSnapshot) {
    // const currentUser = this.authenticationService.currentUserValue;
        if (localStorage.token) {
            this.router.navigate(['/dashboard']);
            return true;
        } 
        return true;
    }
  }