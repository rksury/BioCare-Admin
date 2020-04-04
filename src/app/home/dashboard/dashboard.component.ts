import {Component, OnInit, ViewChild} from '@angular/core';
import {DashboardService} from '../../Services/dashboard/dashboard.service';
import {AuthService} from '../../Services/auth/auth.service';
import {MatTableDataSource} from '@angular/material/table';

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
  user = {};

  constructor(private dashboardService: DashboardService,
              private authService: AuthService) {
  }

  show = false;
  UnApprovedDoctors = [];
  UnApprovedLabs = [];
  UnApprovedChemist = [];

  title = '';
  dtOptions: DataTables.Settings = {};

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
    });
  }
}
