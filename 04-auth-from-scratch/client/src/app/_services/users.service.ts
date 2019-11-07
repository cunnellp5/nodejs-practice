import { API_URL } from './../_constants/constants';
import { Injectable } from '@angular/core';

@Injectable()
export class UsersService {
  baseUsersUrl = `${API_URL}/api/v1/users`;
  header = {
    'content-type': 'application/json',
    authorization: `Bearer ${localStorage.token}`
  }

  getAllUsers() {
    return fetch(this.baseUsersUrl, {
      headers: this.header
    }).then((res) => res.json())
  }

  deactivateUser(body) {
    //need to pass id
    if (body.active) {
      body.active = false;
    }
    return fetch(`${this.baseUsersUrl}/${body._id}`, {
      method: 'patch',
      body: JSON.stringify(body),
      headers: this.header
    }).then(res => res.json())
  }
}
