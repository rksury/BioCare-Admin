import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../Services/dashboard/dashboard.service';
import {AuthService} from '../../Services/auth/auth.service';

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

  ngOnInit(): void {
    this.user = this.authService.getUser()
    console.log(this.user)
    this.getDashBoardData();
  }

  getDashBoardData() {
    this.dashboardService.getData().subscribe(data => {
      this.count = data.counts;
    });
  }
}
