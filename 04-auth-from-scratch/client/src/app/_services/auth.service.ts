import { API_URL } from './../_constants/constants';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {


  login(formData) {
    return fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'content-type': 'application/json' }
    })
      .then((res) => res.json())
  }

  // getNotes() {
  //   return fetch(`${API_URL}/api/v1/notes`, {
  //     headers: { authorization: `Bearer ${localStorage.token}` }
  //   })
  //     .then((res) => res.json())
  // }

  // deleteNote(id) {
  //   return fetch(`${API_URL}/api/v1/notes/${id}`, {
  //     method: 'delete',
  //     headers: {
  //       'content-type': 'application/json',
  //       authorization: `Bearer ${localStorage.token}`,
  //     }
  //   }).then((res) => res.json)
  // }

  // addNote(form) {
  //   return fetch(`${API_URL}/api/v1/notes`, {
  //       method: 'post',
  //       body: JSON.stringify(form.getRawValue()),
  //       headers: {
  //         'content-type': 'application/json',
  //         authorization: `Bearer ${localStorage.token}`,
  //       }
  //   })
  //   .then(res => res.json())
  // }
}
