import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeModule} from './home/home.module';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},

  {path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent },

];

@NgModule({
  imports: [
    HomeModule,
    RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule {
}
