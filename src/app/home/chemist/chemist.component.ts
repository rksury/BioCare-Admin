import {Component, OnInit} from '@angular/core';
import {ChemistService} from '../../Services/chemist/chemist.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-chemist',
  templateUrl: './chemist.component.html',
  styleUrls: ['./chemist.component.css']
})
export class ChemistComponent implements OnInit {
  chemists;
  show = false;
  chemistToEdit;
  errorMessage;
  dtOptions: DataTables.Settings = {};

  ChemistForm = new FormGroup({
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

  constructor(private chemistService: ChemistService) {
  }

  ngOnInit(): void {
    this.getChemists();
  }

  getChemists() {
    // this.show = false;
    this.chemistService.getChemists().subscribe(chemists => {
      this.chemists = chemists;
      this.show = true;
    });
  }

  // addChemist() {
  //   this.chemistService.addChemist(this.ChemistForm.value).subscribe();
  // }

  addChemist() {
    console.log(this.ChemistForm)
    this.chemistService.addChemist(this.ChemistForm.value).subscribe(
      data => {
      }, error => {
        if (error.status === 400) {
          console.log(error);
          this.errorMessage = error.error;
        }

      }
    );
  }

  deleteChemist(pk) {
    this.chemistService.deleteChemist(pk).subscribe();
  }
  showProfile(chemist) {
    this.chemists = chemist;
  }


  editChemistForm(pk) {
    this.chemistService.getChemist(pk).subscribe(doctor => {
      this.ChemistForm.reset();
      this.ChemistForm.patchValue({
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
      this.chemistToEdit = doctor.id;
    });
  }

  editChemist() {
    this.chemistService.updateChemist(this.chemistToEdit, this.ChemistForm.value).subscribe(
      data => {
        this.getChemists();
      }
    );
    this.chemistToEdit = null;
    this.ChemistForm.reset();
  }

}
