import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../Services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // public errorMessage = {
  //      email: [
  //          {type: 'required', message: 'email required'},
  //
  //
  //      ],
  //      password: [
  //          {type: 'required', message: 'password required'},
  //          {type: 'maxlength', message: 'username cant be longer than 50 characters'},
  //          {type: 'minlength', message: 'username must be 4 characters'},
  //
  //      ]
  //  };
  //
  // submitform = this.formbuilder.group({
  //      email: ['string', Validators.required, Validators.email],
  //      password: ['string', [Validators.required, Validators.maxLength(50), Validators.minLength(4)]]
  //  });


  submitform = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),

  });

  // get email() {
  //       return this.submitform.get('email');
  //   }
  //
  //   get password() {
  //       return this.submitform.get('password');
  //   }


  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    console.warn(this.submitform.value);
    this.authService.login(this.submitform.value).subscribe(
      data => {
        window.localStorage.setItem('token', data['token']);
        this.router.navigate(['/home/dashboard']);
      }
    );
  }
}
