import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  LOGIN_URL = 'http://localhost:5000/auth/login';
  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
      Validators.pattern(/(^[a-zA-Z0-9_]*$)/)
    ]),
    password: new FormControl('', [
      Validators.minLength(10),
      Validators.required
    ])
  });
  errorMsg = '';
  loggingIn: boolean = false;

  constructor(
    private router: Router
  ) { }

  login(e) {
      e.preventDefault();
      this.errorMsg = '';
      const formData = {
          username: this.loginForm.controls['username'].value,
          password: this.loginForm.controls['password'].value
      }
      this.loggingIn = true;

      fetch(this.LOGIN_URL, {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: { 'content-type': 'application/json' }
      }).then((res) => {
          if (res.ok) {
              return res.json();
          }
          return res.json().then((error) => {
              this.errorMsg = error.message;
              throw new Error(error.message);
          })
      }).then((result) => {
          setTimeout(() => {
              this.loggingIn = false;
              localStorage.token = result.token
              this.router.navigate(['/dashboard'])
          }, 1000)
      }).catch((error) => {
          setTimeout(() => {
              this.loggingIn = false;
              this.errorMsg = error.message;
          }, 1000)
      })
  }

}
