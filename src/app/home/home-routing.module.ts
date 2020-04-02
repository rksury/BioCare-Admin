import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DoctorComponent} from './doctor/doctor.component';
import {ChemistComponent} from './chemist/chemist.component';
import {LabComponent} from './lab/lab.component';
import {PatientComponent} from './patient/patient.component';


const routes: Routes = [
  {
    path: 'home', component: HomeComponent,
    children: [

      {path: 'dashboard', component: DashboardComponent},
      {path: 'doctor', component: DoctorComponent},
      {path: 'chemist', component: ChemistComponent},
      {path: 'lab', component: LabComponent},
      {path: 'patient', component: PatientComponent},
      {path: '', redirectTo: '/home/dashboard', pathMatch: 'full'},
    ]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
