import {Component, OnInit} from '@angular/core';
import {DoctorService} from '../../Services/doctor/doctor.service';
import {FormControl, FormGroup} from '@angular/forms';
import validate = WebAssembly.validate;
import {Router} from "@angular/router";

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

  constructor(private doctorService: DoctorService,
              private router: Router) {
  }

  dtOptions: DataTables.Settings = {
    lengthChange: false,
    pageLength: 10,

  };

  ngOnInit() {
    this.getDoctors();
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
  }

  getDoctors() {
    // this.show = false;
    this.doctorService.getDoctors().subscribe(doctors => {
      this.doctors = doctors;
      this.show = true;
    });
  }

  addDoctor() {
    this.doctorService.addDoctor(this.DoctorForm.value).subscribe();
  }

  deleteDoctor(pk) {
    this.doctorService.deleteDoctor(pk).subscribe(data => {
      // this.getDoctors();
          this.router.navigate(['/home/doctor']);

    });
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
    this.doctorService.updateDoctor(this.doctorToEdit, this.DoctorForm.value).subscribe(
      data => {
        // this.getDoctors();
      }
    );
    this.doctorToEdit = null;
    this.router.navigate(['/home/doctor']);
  }
}





