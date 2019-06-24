import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { clientFS, secretFS } from '../../../config';


@Injectable({
  providedIn: 'root'
})
export class FourSquareService {

    lat = '29.95465';
    long = '-90.07507';
    v = '20190619';
    categoryId = '4d4b7105d754a06376d81259';
    limit = '15';
    //radius = '100';

    url: string = 'https://api.foursquare.com/v2/venues/search';
    // urlParams: string = `?client_id=${clientFS}&client_secret=${secretFS}&ll=${this.lat},${this.long}&v=${this.v}&categoryId=${this.categoryId}&llAcc=${this.llAcc}`;

    serverUrl: string = 'https://470937f6.ngrok.io';
    endpont: string = '/locations';

  constructor(private http: HttpClient) {

  }

  getLocationData(): any {
      // make API call to foursquare
      return this.http.get(this.url, {
          params: {
              client_id: clientFS,
              client_secret: secretFS,
              ll: '29.95465,-90.07507',
              v: this.v,
              categoryId: this.categoryId,
              limit: this.limit,
              //raduis: this.radius,
          }
      })
  }

  postLocationData(name, type, address, lat, long) {
    return this.http.post(`${this.serverUrl}${this.endpont}`, {
        name,
        type,
        address,
        lat,
        long,
    });
  }


}
