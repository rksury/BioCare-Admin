import {Injectable} from '@angular/core';
import {GodService} from '../god.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private godService: GodService) {
  }

  getData(): Observable<any> {
    return this.godService.authGet('dashboard');
  }
}
