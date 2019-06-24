import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  url: string = 'https://470937f6.ngrok.io'
  endpoint: string = '/locations';

  getLocations() {
      return this.http.get(`${this.url}${this.endpoint}`)
  }



}
