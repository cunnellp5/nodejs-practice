import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot
} from "@angular/router";
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DashboardRedirect implements CanActivate {

    constructor(
        private router: Router,
    ) { }

    canActivate(route: ActivatedRouteSnapshot) {
        if (!localStorage.token) {
            this.router.navigate(['/login']);
            return true;
        } 
        return true;
    }
  }