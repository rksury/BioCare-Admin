import {Injectable} from '@angular/core';
import {GodService} from '../god.service';

@Injectable({
  providedIn: 'root'
})
export class ChemistService {

  constructor(private godService: GodService) {
  }

  getChemists(params?) {
    return this.godService.authGet('chemist/');
  }
}
