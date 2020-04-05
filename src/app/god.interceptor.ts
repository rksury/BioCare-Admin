import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
// import {HomeComponent} from './home/home.component';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class GodInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse && event.status === 404) {
        this.toastr.success('Hello world!', 'Toastr fun!');
      }
    }));
  }
}
