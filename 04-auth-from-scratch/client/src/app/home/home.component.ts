import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  navigating: boolean = false;

  constructor(private router: Router) { }

  navigate(routeString) {
    this.navigating = true;
    setTimeout(() => {
      this.navigating = false;
      this.router.navigate([`/${routeString}`])
    }, 1000)  
  }

}
