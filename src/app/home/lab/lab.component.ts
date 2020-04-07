import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';

import {LabService} from '../../Services/lab/lab.service';



@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.css']
})
export class LabComponent implements OnInit {
  labs;
  show = false;
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

  constructor(private labService: LabService,
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

  ngOnInit(): void {
    this.getLabs();
  }

  getLabs() {
    this.labService.getLabs().subscribe(labs => {
      this.labs = labs;
      this.show = true;
      this.refresh();
    });
  }
   refresh() {
    this.labService.getLabs().subscribe(data => {
      this.show = true;
      this.dtTrigger.next();
      // this.rerender();
    });
  }
  refreshLabs() {
    this.labService.getLabs().subscribe(labs => {
      this.labs = labs;
      this.show = true;
    });
  }

  addLab() {
    console.log(this.LabForm);
    this.labService.addLab(this.LabForm.value).subscribe(
      data => {
        this.errorMessage = null;
        this.LabForm.reset();
        this.refresh();
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
      this.refreshLabs();
    });
  }

  showProfile(lab) {
    this.lab = lab;
  }


  editLabForm(pk) {
    this.labService.getLab(pk).subscribe(doctor => {
      console.log(doctor);
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
        this.refreshLabs();
        this.LabForm.reset();
        this.errorMessage = null;
      }
    );
    this.labToEdit = null;
    this.router.navigate(['/lab']);

  }
}
