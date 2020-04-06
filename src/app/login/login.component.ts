import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../Services/auth/auth.service';
import {ToastrService} from 'ngx-toastr';

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
              private authService: AuthService,
              private tost: ToastrService) {
  }

  ngOnInit() {
    this.authService.verifyToken()
  }

  onSubmit() {
    this.authService.login(this.submitform.value).subscribe(
      data => {
        window.localStorage.setItem('token', data.token);
        window.localStorage.setItem('user', JSON.stringify(data.user));
        this.router.navigate(['/home']);
      },
      error => {
        if (error.status === 400) {
          if (error.error.error) {
            this.tost.error(error.error.error);
          }
          this.formErrors = error.error;
        }
      }
    );
  }
}
