import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, PatternValidator } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

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
    this.signupForm.updateValueAndValidity();
    console.log(this.signupForm, 'air hairs')
    console.log(this.signupForm.getRawValue())
  }

  // validUser() {

  // }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
       ? null : {'mismatch': true};
  }

}
