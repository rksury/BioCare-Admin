import {Injectable} from '@angular/core';
import {GodService} from '../god.service';

@Injectable({
  providedIn: 'root'
})
export class LabService {

  constructor(private godService: GodService) {
  }

  getLabs(params?) {
    return this.godService.authGet('chemist/');
  }
}
