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
  formErrors;

  submitform = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),

  });


  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.login(this.submitform.value).subscribe(
      data => {
        window.localStorage.setItem('token', data.token);
        window.localStorage.setItem('user', JSON.stringify(data.user));
        this.router.navigate(['/dashboard']);
      },
      error => {
        if (error.status === 400) {
          this.formErrors = error.error;
        }
      }
    );
  }
}
