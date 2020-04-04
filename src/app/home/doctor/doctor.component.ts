import {Component, OnInit} from '@angular/core';
import {DoctorService} from '../../Services/doctor/doctor.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  doctors;
  show = false;
  doctor;
  doctorToEdit;

  DoctorForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    confirm_password: new FormControl(''),
    email: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    mobile_number: new FormControl(''),
    address1: new FormControl(''),
    address2: new FormControl(''),
    zip_code: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
  });

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

  addDoctor() {
    this.doctorService.addDoctor(this.DoctorForm.value).subscribe();
  }

  deleteDoctor(pk) {
    this.doctorService.deleteDoctor(pk).subscribe();
  }


  editDoctorForm(pk) {
    this.doctorService.getDoctor(pk).subscribe(doctor => {
      this.DoctorForm.reset();
      this.DoctorForm.patchValue({
        username: doctor.user.username,
        email: doctor.user.email,
        first_name: doctor.user.first_name,
        last_name: doctor.user.last_name,
        mobile_number: doctor.user.mobile_number,
        address1: doctor.user.address.address1,
        address2: doctor.user.address.address2,
        zip_code: doctor.user.address.zip_code,
        city: doctor.user.address.city,
        country: doctor.user.address.country,
      });
      this.doctorToEdit = doctor.id;
    });
  }

  editDoctor() {
    this.doctorService.updateDoctor(this.doctorToEdit, this.DoctorForm.value).subscribe();
    this.doctorToEdit = null;
  }
}





