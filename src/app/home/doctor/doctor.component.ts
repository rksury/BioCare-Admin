import {Component, OnInit} from '@angular/core';
import {DoctorService} from "../../Services/doctor/doctor.service";

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  doctors;
  show = false;

  constructor(private doctorService: DoctorService) {
  }

  dtOptions: DataTables.Settings = {};

  ngOnInit() {
    this.getDoctors();
  }

  getDoctors() {
    this.doctorService.getDoctors().subscribe(doctors => {
      this.doctors = doctors;
      this.show = true;
    });
  }

}





