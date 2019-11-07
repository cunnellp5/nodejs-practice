import { Component, OnInit } from '@angular/core';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users: any;

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.usersService
      .getAllUsers()
      .then((users) => {
        this.users = users;
      })
  }

  deactivateUser(user) {
    this.usersService
      .deactivateUser(user)
      .then((res) => {
        console.log(res, 'res')
      })
  }

}
