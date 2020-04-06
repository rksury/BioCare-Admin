import {Component, OnInit} from '@angular/core';
import {LabService} from '../../Services/lab/lab.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.css']
})
export class LabComponent implements OnInit {
  labs;
  show = false;
  dtOptions: DataTables.Settings = {};
  lab;
  labToEdit;
  errorMessage;

  LabForm = new FormGroup({
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

  addLab() {
    console.log(this.LabForm)
    this.labService.addLab(this.LabForm.value).subscribe(
      data => {
      }, error => {
        if (error.status === 400) {
          console.log(error);
          this.errorMessage = error.error;
        }

      }
    );
  }

  deleteLab(pk) {
    this.labService.deleteLab(pk).subscribe(data => {
      this.getLabs();
    });
  }

  showProfile(lab) {
    this.lab = lab;
  }


  editLabForm(pk) {
    this.labService.getLab(pk).subscribe(doctor => {
      console.log(doctor)
      this.LabForm.reset();
      this.LabForm.patchValue({
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
      this.labToEdit = doctor.id;
    });
  }

  editLab() {
    this.labService.updateLab(this.labToEdit, this.LabForm.value).subscribe(
      data => {
        this.getLabs();

      }
    );
    this.labToEdit = null;
    this.LabForm.reset();
  }
}
