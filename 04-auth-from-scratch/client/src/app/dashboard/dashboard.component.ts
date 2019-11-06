import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, PatternValidator } from '@angular/forms';
import { API_URL } from '../_constants/constants';
import { NotesService } from '../_services/notes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  user = null;
  showForm = true;
  notes = [];
  
  noteForm = new FormGroup({
    title: new FormControl(''),
    note: new FormControl('')
  });

  constructor(
    private router: Router,
    private notesService: NotesService
  ) { }

  ngOnInit() {
    fetch(API_URL, {
        headers: {
          authorization: `Bearer ${localStorage.token}`,
        }
    })
      .then(res => res.json())
      .then((result) => {
        console.log(result, 'WHICH RESULT')
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
    this.notesService
      .getNotes()
      .then((res) => {
        this.notes = res;
      })
  }

  addNote(e) {
    e.preventDefault();
    this.notesService
      .addNote(this.noteForm)
      .then((note) => {
        this.noteForm.reset();
        this.showForm = false;
        this.notes.push(note);
    })
  }

  delete(id) {
    this.notesService
      .deleteNote(id)
      .then(() => {
        this.getNotes()
      })
  }

}
