import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
  

export class SignupComponent {
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

  onSubmit(e) {
    e.preventDefault();
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
      setTimeout(() => {
        this.signingUp = false;
        this.router.navigate(['/login'])
      }, 1000)
    }).catch((error) => {
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
