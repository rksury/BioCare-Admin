import {Component, OnInit, ViewChild} from '@angular/core';
import {ChemistService} from '../../Services/chemist/chemist.service';
import {FormControl, FormGroup} from '@angular/forms';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-chemist',
  templateUrl: './chemist.component.html',
  styleUrls: ['./chemist.component.css']
})
export class ChemistComponent implements OnInit {
  chemists;
  show = false;
  chemist;
  chemistToEdit;
  errorMessage;

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

  constructor(private chemistService: ChemistService,
              private router: Router) {}

   @ViewChild(DataTableDirective, {static: false})
    dtElement: DataTableDirective;
    dtOptions: DataTables.Settings = {
      lengthChange: false,
      pageLength: 10
  };
   dtTrigger: Subject<any> = new Subject();

  ngOnInit(): void {
     this.getChemists();
  }

  getChemists() {
    this.chemistService.getChemists().subscribe(chemists => {
      this.chemists = chemists;
      this.show = true;
      this.dtTrigger.next();
      this.refresh();
    });
  }

   refresh() {
    this.chemistService.getChemists().subscribe(data => {
      this.show = true;
      this.dtTrigger.next();
      // this.rerender();
    });
  }
  refreshChemist() {
    this.chemistService.getChemists().subscribe(chemists => {
      this.chemists = chemists;
      this.show = true;
    });
  }

  // addChemist() {
  //   this.chemistService.addChemist(this.ChemistForm.value).subscribe();
  // }

  addChemist() {
    console.log(this.ChemistForm);
    this.chemistService.addChemist(this.ChemistForm.value).subscribe(
      data => {
         this.errorMessage = null;
         this.ChemistForm.reset();
      }, error => {
        if (error.status === 400) {
          console.log(error);
          this.errorMessage = error.error;
        }

      }
    );
  }

  deleteChemist(pk) {
    this.chemistService.deleteChemist(pk).subscribe(
      data => {
        this.refreshChemist();
      }
    );
  }

  showProfile(chemist) {
    this.chemist = chemist;
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
        this.refreshChemist();
        this.ChemistForm.reset();
        this.errorMessage = null;
      }
    );
    this.chemistToEdit = null;
    this.router.navigate(['/chemist']);

  }

}
