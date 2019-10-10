import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  GET_ALL_USERS_URL = 'http://localhost:5000';
  users: any;

  constructor() { }

  ngOnInit() {
    fetch(`${this.GET_ALL_USERS_URL}/api/v1/users`, {
      headers: {
        authorization: `Bearer ${localStorage.token}`
      }
    }).then((res) => res.json())
      .then((users) => {
        this.users = users;
    })
  }

}
