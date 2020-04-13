import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GodService {
  baseUrl = environment.base_Url;

  constructor(private httpClient: HttpClient) {
  }

  get headers() {
    const httpOptions = {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + window.localStorage.getItem('token')
        }
      )
    };
    return httpOptions;
  }

  get(url, queryparams?) {
    return this.httpClient.get(this.baseUrl, {params: queryparams});
  }

  post(url, payload) {
    return this.httpClient.post(this.baseUrl + url, payload);
  }

  authGet(url, queryparams?) {
    const httpOptions = {
      headers: {'Content-Type': 'application/json'},
      params: queryparams
    };

    return this.httpClient.get(this.baseUrl + url, httpOptions);

  }

  authPost(url, data) {
    const httpOptions = {
      headers: {'Content-Type': 'application/json'},
    };
    return this.httpClient.post(this.baseUrl + url, data, httpOptions);
  }

  authDelete(url) {
    const httpOptions = {
      headers: {'Content-Type': 'application/json'},
    };
    return this.httpClient.delete(this.baseUrl + url, httpOptions);

  }

  authUpdate(url, body) {
    const httpOptions = {
      headers: {'Content-Type': 'application/json'},
    };
    return this.httpClient.put(this.baseUrl + url, body, httpOptions);

  }
}
