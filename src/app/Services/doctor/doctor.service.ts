import {Injectable} from '@angular/core';
import {GodService} from '../god.service';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private godService: GodService) {
  }

  getDoctor(pk): Observable<any> {
    return this.godService.authGet('doctor/' + pk);
  }

  getDoctors(params?) {
    return this.godService.authGet('doctor/');
  }

  ApproveDoctor(pk) {
    const data = {id: pk}
    return this.godService.authPost('doctor/approve', data);
  }

  addDoctor(data) {
    return this.godService.authPost('doctor/', data);
  }

  deleteDoctor(pk) {
    return this.godService.authDelete('doctor/' + pk);
  }

  updateDoctor(pk, data) {
    return this.godService.authUpdate('doctor/' + pk, data);

  }
}
