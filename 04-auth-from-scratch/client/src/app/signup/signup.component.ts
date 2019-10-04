import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
  

export class SignupComponent implements OnInit {
  SIGNUP_URL = 'http://localhost:5000/auth/signup';
  signingUp: boolean = false

  signupForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
      Validators.pattern(/(^[a-zA-Z0-9_]*$)/)
    ]),
    password: new FormControl('', [
      Validators.minLength(10),
      Validators.required
    ]),
    confirmPassword: new FormControl('', [
      Validators.minLength(10),
      Validators.required
    ]),
  }, this.passwordMatchValidator);

  errorMsg = '';

  constructor(
    private router: Router
  ) { }

  ngOnInit() {

  }

  ngOnChanges() {

  }

  onSubmit() {
    this.errorMsg = '';
    const formData = {
      username: this.signupForm.controls['username'].value,
      password: this.signupForm.controls['password'].value
    }
    this.signingUp = true;

    fetch(this.SIGNUP_URL, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'content-type': 'application/json',
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return res.json().then((error) => {
        this.errorMsg = error.message;
        throw new Error(error.message);
      })
    }).then((user) => {
      console.log(user, 'use hair')
      setTimeout(() => {
        this.signingUp = false;
        this.router.navigate(['/login'])
      }, 1000)
    }).catch((error) => {
      console.log(error, 'air hair')
      setTimeout(() => {
        this.signingUp = false;
        this.errorMsg = error.message;
      }, 1000)
    })
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
       ? null : {'mismatch': true};
  }

}
