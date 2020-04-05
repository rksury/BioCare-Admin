import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  SignupForm: FormGroup;
  submitted = false;
  fullname: 'string';
  email: 'string';
  Password: 'string';
  errors = [];


  submitform = new FormGroup({
    fullname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirm_password: new FormControl(''),

  });




  constructor(private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {
  }

  get function() { return this.submitform.controls; }
  onSubmit() {
    console.warn(this.submitform.value);
  }
}
