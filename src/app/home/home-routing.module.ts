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
    path: '', component: HomeComponent,
    children: [

      {path: '', component: DashboardComponent},
      {path: 'doctor', component: DoctorComponent},
      {path: 'chemist', component: ChemistComponent},
      {path: 'lab', component: LabComponent},
      {path: 'patient', component: PatientComponent},
      {path: '', redirectTo: '', pathMatch: 'full'},
    ]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
