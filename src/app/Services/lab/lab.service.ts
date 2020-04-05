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
    return this.godService.authGet('lab/');
  }


  getLab(pk): Observable<any> {
    return this.godService.authGet('lab/' + pk);
  }

  ApproveLab(pk) {
    const data = {id: pk}
    return this.godService.authPost('lab/approve', data);
  }

  addLab(data) {
    return this.godService.authPost('lab/', data);
  }

  deleteLab(pk) {
    return this.godService.authDelete('lab/' + pk);
  }

  updateLab(pk, data) {
    return this.godService.authUpdate('lab/' + pk, data);

  }
}
