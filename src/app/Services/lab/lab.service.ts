import {Injectable} from '@angular/core';
import {GodService} from '../god.service';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LabService {

  constructor(private godService: GodService) {
  }

  getLabs(params?) {
    return this.godService.authGet('chemist/');
  }

  getLab(pk): Observable<any> {
    return this.godService.authGet('chemist/' + pk);
  }

  ApproveLab(pk) {
    const data = {id: pk}
    return this.godService.authPost('chemist/approve', data);
  }

  addLab(data) {
    return this.godService.authPost('chemist/', data);
  }

  deleteLab(pk) {
    return this.godService.authDelete('chemist/' + pk);
  }

  updateLab(pk, data) {
    return this.godService.authUpdate('chemist/' + pk, data);

  }
}
