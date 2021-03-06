import {Component, OnInit} from '@angular/core';
import {AuthService} from '../Services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user = {
    id: 1,
    username: '',
    email: '',
    mobile_number: '',
    first_name: '',
    last_name: '',
    full_name: ' ',
    address: null,
    fullname: ''
  };
  popup = null;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.authService.verifyToken();
    // this.showToast();
  }

  logOut() {
    this.authService.logout();
  }

  async showToast() {
    this.popup = 'show';
    setTimeout(function() {
      this.popup = null;
    }, 2000);

  }

}
