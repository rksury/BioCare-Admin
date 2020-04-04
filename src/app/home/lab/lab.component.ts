import {Component, OnInit} from '@angular/core';
import {LabService} from '../../Services/lab/lab.service';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.css']
})
export class LabComponent implements OnInit {
  labs;
  show = false;
  dtOptions: DataTables.Settings = {};


  constructor(private labService: LabService) {
  }

  ngOnInit(): void {
    this.getLabs();
  }

  getLabs() {
    this.labService.getLabs().subscribe(labs => {
      this.labs = labs;
      this.show = true;
    });
  }
}
