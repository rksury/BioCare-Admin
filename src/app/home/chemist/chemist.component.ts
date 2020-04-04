import {Component, OnInit} from '@angular/core';
import {ChemistService} from '../../Services/chemist/chemist.service';

@Component({
  selector: 'app-chemist',
  templateUrl: './chemist.component.html',
  styleUrls: ['./chemist.component.css']
})
export class ChemistComponent implements OnInit {
  chemists;
  show = false;
  dtOptions: DataTables.Settings = {};


  constructor(private chemistService: ChemistService) {
  }

  ngOnInit(): void {
    this.getChemists();
  }

  getChemists() {
    this.chemistService.getChemists().subscribe(chemists => {
      this.chemists = chemists;
      this.show = true;
    });
  }

}
