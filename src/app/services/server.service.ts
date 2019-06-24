import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serverURL } from '../../../config';



@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  url: string = serverURL;
  endpoint: string = '/locations';

  getLocations() {
      return this.http.get(`${this.url}${this.endpoint}`)
  }



}
