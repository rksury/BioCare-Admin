import {Component, OnInit, ViewChild} from '@angular/core';
import {DashboardService} from '../../Services/dashboard/dashboard.service';
import {AuthService} from '../../Services/auth/auth.service';
import {MatTableDataSource} from '@angular/material/table';
import {DoctorService} from '../../Services/doctor/doctor.service';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import {ChemistService} from '../../Services/chemist/chemist.service';
import {LabService} from '../../Services/lab/lab.service';

declare var $: any;

export interface DRColumn {
  id: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  count = {
    doctor: '0',
    lab: '0',
    chemist: '0'
  };
  user = {
        id: 1,
        username: '',
        email: '',
        mobile_number: '',
        first_name: '',
        last_name: '',
        fullname: '',
        full_name: ' ',
        address: null
      };

  constructor(private dashboardService: DashboardService,
              private authService: AuthService,
              private doctorService: DoctorService,
              private chemistService: ChemistService,
              private labService: LabService) {
  }

  show = false;
  UnApprovedDoctors = [];
  UnApprovedLabs = [];
  UnApprovedChemist = [];
  popup = null;

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {
    pageLength: 10
  };
  dtTrigger: Subject<any> = new Subject();

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.getDashBoardData();
  }

  getDashBoardData() {
    this.dashboardService.getData().subscribe(data => {
      this.count = data.counts;
      this.UnApprovedDoctors = data.pending_approvals.doctors;
      this.UnApprovedLabs = data.pending_approvals.labs;
      this.UnApprovedChemist = data.pending_approvals.chemist;
      this.show = true;
      this.dtTrigger.next();

    });
  }

  refreshDashboard() {
    this.dashboardService.getData().subscribe(data => {
      this.count = data.counts;
      this.UnApprovedDoctors = data.pending_approvals.doctors;
      this.UnApprovedLabs = data.pending_approvals.labs;
      this.UnApprovedChemist = data.pending_approvals.chemist;
      this.show = true;
      // this.dtTrigger.next();
      // this.rerender();


    });
  }


  ApproveDoctor(id) {
    this.doctorService.ApproveDoctor(id).subscribe(data => {
      this.refreshDashboard();
    });
  }

  ApproveChemist(id) {
    this.chemistService.ApproveChemist(id).subscribe(data => {
      this.refreshDashboard();
    });

  }

  ApproveLab(id) {
    this.labService.ApproveLab(id).subscribe(data => {
      this.refreshDashboard();
    });
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      // this.dtTrigger.next();
    });
  }
}
