import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  API_URL = 'http://localhost:5000';
  user = null;
  constructor( private router: Router ) { }

  ngOnInit() {
    fetch(this.API_URL, {
        headers: {
          authorization: `Bearer ${localStorage.token}`,
        }
    })
      .then(res => res.json())
      .then((result) => {
          if (result.user) {
              this.user = result.user
          } else {
            this.logout();
          }
      })
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
