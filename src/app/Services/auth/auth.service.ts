import {Injectable} from '@angular/core';
import {GodService} from '../god.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private godService: GodService,
              private router: Router) {
  }

  login(data) {
    return this.godService.post('user/login', data);
  }

  logout() {
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }

  verifyToken() {
    const payload = {token: window.localStorage.getItem('token')};
    this.godService.post('user/verify-token', payload).subscribe(data => {
      console.log(data);
    }, error => {
      this.logout();
    });
  }
}
