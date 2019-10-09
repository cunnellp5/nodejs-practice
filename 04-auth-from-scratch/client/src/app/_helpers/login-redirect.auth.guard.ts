import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot
} from "@angular/router";
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class LoggedInTokenRedirect implements CanActivate {
    helper = new JwtHelperService();
    decodedToken = this.helper.decodeToken(localStorage.token);
    isExpired = this.helper.isTokenExpired(localStorage.token);
    isAdmin: boolean;

    constructor(
        private router: Router,
    ) { }
    canActivate() {
        if (localStorage.token) {
            let admin = this.decodedToken.role === 'admin';
            console.log(admin,'admin')
            if (admin) {
                return true;
            } else {
                this.router.navigate(['/dashboard']);
                return true;
            }
        } 
        return true;
    }
  }