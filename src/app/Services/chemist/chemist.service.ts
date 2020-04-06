import {Injectable} from '@angular/core';
import {GodService} from '../god.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChemistService {

  constructor(private godService: GodService) {
  }

  ApproveChemist(pk) {
    const data = {id: pk}
    return this.godService.authPost('chemist/approve', data);
  }

  getChemist(pk): Observable<any> {
    return this.godService.authGet('chemist/' + pk);
  }

  getChemists(params?) {
    return this.godService.authGet('chemist/');
  }

  addChemist(data) {
    return this.godService.authPost('chemist/', data);
  }

  deleteChemist(pk) {
    return this.godService.authDelete('chemist/' + pk);
  }

  updateChemist(pk, data) {
    return this.godService.authUpdate('chemist/' + pk, data);

  }
}
