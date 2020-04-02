import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {HomeComponent} from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorComponent } from './doctor/doctor.component';
import { ChemistComponent } from './chemist/chemist.component';
import { LabComponent } from './lab/lab.component';


@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    DoctorComponent,
    ChemistComponent,
    LabComponent
  ],

  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class HomeModule {
}
