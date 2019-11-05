import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  API_URL = 'http://localhost:5000';
  user = null;
  showForm = true;
  notes = [];
  
  noteForm = new FormGroup({
    title: new FormControl(''),
    note: new FormControl('')
  });

  constructor(
    private router: Router
  ) { }

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
            this.getNotes();
          } else {
            this.logout();
          }
      })
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getNotes() {
    fetch(`${this.API_URL}/api/v1/notes`, {
      headers: {
        authorization: `Bearer ${localStorage.token}`,
      }
    }).then((res) => res.json())
      .then((notes) => {
      this.notes = notes
    })
  }

  addNote(e) {
    e.preventDefault();
    fetch(`${this.API_URL}/api/v1/notes`, {
        method: 'post',
        body: JSON.stringify(this.noteForm.getRawValue()),
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.token}`,
        }
    })
    .then(res => res.json())
      .then((note) => {
        this.noteForm.reset();
        this.showForm = false;
        this.notes.push(note);
    })
  }

  delete(id) {
    // get id some how
    fetch(`${this.API_URL}/api/v1/notes/${id}`, {
      method: 'delete',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.token}`,
      }
    })
      .then(res => res.json)
      .then(() => {
        this.getNotes();
    })
  }

}
