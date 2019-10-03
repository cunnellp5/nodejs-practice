import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, PatternValidator } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
  

export class SignupComponent implements OnInit {
  SIGNUP_URL = 'http://localhost:5000/auth/signup';

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

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges() {

  }

  onSubmit() {
    const formData = {
      username: this.signupForm.controls['username'].value,
      password: this.signupForm.controls['password'].value
    }

    fetch(this.SIGNUP_URL, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'content-type': 'application/json',
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        res.json().then((error) => {
          throw new Error(error.message);
        })
      }
    }).then((user) => {
      console.log(user, 'user created')
    }).catch((error) => {
      console.log(error, 'hell**********************************************o');
      this.errorMsg = error.message;
    })
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
       ? null : {'mismatch': true};
  }

}
