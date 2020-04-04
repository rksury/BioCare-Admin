import {Injectable} from '@angular/core';
import {GodService} from '../god.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private godService: GodService) {
  }

  getDoctors(params?) {
    return this.godService.authGet('doctor/');
  }

  ApproveDoctor(pk) {
    const data = {id: pk}
    return this.godService.authPost('doctor/approve', data);
  }
}
