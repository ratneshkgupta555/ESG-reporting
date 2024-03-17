import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Root_URL } from './serviceconstant';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  headerOptions = {
    'content-type': 'application/json',
    // 'authentication', `${token}`
  };
  
  constructor(private httpClient: HttpClient) { }

  getAPI(url: any, headerOptions?: any): Observable<any> {
    return of(null);
    //return this.httpClient.get(Root_URL+url, headerOptions || this.headerOptions);
  }

  postAPI(url: any, payload: any, headerOptions?: any): Observable<any> {
    // return of(null);
   return this.httpClient.post(Root_URL+url, payload, headerOptions || this.headerOptions);
  }
}