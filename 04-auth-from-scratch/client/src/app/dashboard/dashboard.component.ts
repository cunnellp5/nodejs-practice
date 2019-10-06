import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  API_URL = 'http://localhost:5000/';
  user = null;
  showForm = true;
  
  noteForm = new FormGroup({
    title: new FormControl(''),
    note: new FormControl('')
  });

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

  addNote(e) {
    e.preventDefault();
    console.log(this.noteForm.getRawValue(),'noteform!')
    fetch(`${this.API_URL}api/v1/notes`, {
        method: 'post',
        body: JSON.stringify(this.noteForm.getRawValue()),
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.token}`,
        }
    })
    .then(res => res.json())
    .then((note) => {
        console.log(note)
    })

  }

}
