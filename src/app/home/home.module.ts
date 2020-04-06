import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {HomeComponent} from './home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DoctorComponent} from './doctor/doctor.component';
import {ChemistComponent} from './chemist/chemist.component';
import {LabComponent} from './lab/lab.component';
import {PatientComponent} from './patient/patient.component';
// import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {DataTablesModule} from 'angular-datatables';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    DoctorComponent,
    ChemistComponent,
    LabComponent,
    PatientComponent
  ],

  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // BrowserModule,
    // BrowserAnimationsModule,
    HttpClientModule,
    DataTablesModule,


  ]
})
export class HomeModule {
}
