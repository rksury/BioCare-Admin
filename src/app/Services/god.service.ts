import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GodService {
  baseUrl = environment.base_Url

  constructor(private httpClient: HttpClient) {
  }

  get(url, queryparams?) {
    return this.httpClient.get(this.baseUrl, {params: queryparams});
  }

  post(url, payload) {
    return this.httpClient.post(this.baseUrl + url, payload);
  }
}
