import {
    CanActivate,
    Router
} from "@angular/router";
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class LoggedInTokenRedirect implements CanActivate {
    helper = new JwtHelperService();

    constructor(
        private router: Router,
    ) { }
    canActivate() {
        if (localStorage.token) {
            let decodedToken = this.helper.decodeToken(localStorage.token);
            let admin = decodedToken.role === 'admin';
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