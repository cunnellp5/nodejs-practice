import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(2)]),
    password: new FormControl('', [Validators.minLength(12), Validators.required]),
    confirmPassword: new FormControl('', [Validators.minLength(12), Validators.required]),
  }, this.passwordMatchValidator);

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges() {

  }

  onSubmit() {
    console.log(this.signupForm.get('confirmPassword').errors)
    console.log(this.signupForm.getRawValue())
    // if (this.validUser()) {
    //   // send data to server
    // }
  }

  // validUser() {

  // }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
       ? null : {'mismatch': true};
  }

}
