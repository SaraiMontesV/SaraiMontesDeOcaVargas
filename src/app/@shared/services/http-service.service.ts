import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormRegister } from '@app/@shared/models/formRegister';
import { environment } from '@env/environment';
// import { retry, catchError } from 'rxjs/operators';
// import { Observable } from 'rxjs/Observable';

// import 'rxjs/add/operator/catch';

// import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {
  constructor(private httpClient: HttpClient) {}

  async getFormRegisterData() {
    return this.httpClient.get<FormRegister>(environment.formRegisterUrl);
  }

  async getMovies() {
    return this.httpClient.get(environment.movies);
  }

  async getMoviesFilter(params: string) {
    return this.httpClient.get(`${environment.moviesFilter}?q=${params}`);
  }
}
