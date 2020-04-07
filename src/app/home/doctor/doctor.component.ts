import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';


import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';

import {DoctorService} from '../../Services/doctor/doctor.service';


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
  errorMessage;

  DoctorForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirm_password: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    mobile_number: new FormControl('', Validators.required),
    address1: new FormControl('', Validators.required),
    address2: new FormControl('', Validators.required),
    zip_code: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
  });

  constructor(private doctorService: DoctorService,
              private router: Router,
              private toster: ToastrService) {
  }

   @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {
    lengthChange: false,
    pageLength: 10
  };
   dtTrigger: Subject<any> = new Subject();

  ngOnInit() {
    this.getDoctors();
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log('fired'));
  }

  getDoctors() {
    this.doctorService.getDoctors().subscribe(doctors => {
      this.doctors = doctors;
      this.show = true;
      this.refresh();
    });
  }

  refresh() {
    this.doctorService.getDoctors().subscribe(data => {
      this.show = true;
      this.dtTrigger.next();
      // this.rerender();
    });
  }

  addDoctor() {
     console.log(this.DoctorForm);
     this.doctorService.addDoctor(this.DoctorForm.value).subscribe(
      data => {
        this.errorMessage = null;
        this.DoctorForm.reset();
        this.refresh();
        this.toster.success('Doctor Added Successfully');
      }, error => {
        if (error.status === 400) {
          console.log(error);
          this.errorMessage = error.error;
        } else {
          this.toster.error('Doctor Was not added.');

        }

      }
    );
  }

  deleteDoctor(pk) {
    this.doctorService.deleteDoctor(pk).subscribe(data => {
      this.router.navigate(['/doctor']);
      this.getDoctors();
      this.refresh();
    });
  }

  showProfile(doctor) {
    this.doctor = doctor;
    this.refresh();
  }

  editDoctorForm(pk) {
    this.doctorService.getDoctor(pk).subscribe(doctor => {
      this.DoctorForm.reset();
      this.errorMessage = null;

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
      this.refresh();
    });
  }

  editDoctor() {
    this.doctorService.updateDoctor(this.doctorToEdit, this.DoctorForm.value).subscribe(
      data => {
        this.getDoctors();
        this.DoctorForm.reset();
        this.errorMessage = null;
      }
    );
    this.doctorToEdit = null;
    this.router.navigate(['/doctor']);
    this.refresh();
  }
}





