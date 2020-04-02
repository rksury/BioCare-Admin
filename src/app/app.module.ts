import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeModule} from './home/home.module';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {GodInterceptor} from './god.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    HomeModule

  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: GodInterceptor, multi: true}],

  bootstrap: [AppComponent]
})
export class AppModule {
}
