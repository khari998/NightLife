import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { registerElement } from "nativescript-angular/element-registry";
registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);
import { Marker, Position } from 'nativescript-google-maps-sdk';

import * as geolocation from "nativescript-geolocation";
import { Accuracy } from "tns-core-modules/ui/enums"; // used to describe at what accuracy the location should be get


@Component({
  selector: 'ns-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    lat = 29.9511
    long = 90.0715

@ViewChild("MapView", null) mapView: ElementRef;

 onMapReady = (event) => {
    const mapView = event.object;
    //mapView.settings.compassEnabled = true;
    mapView.settings.myLocationButtonEnabled = true;
    //mapView.myLocationEnabled = true;
     var marker = new Marker();
     marker.position = Position.positionFromLatLng(this.lat, this.long);
     mapView.addMarker(marker);


};
  constructor() {

   }

  ngOnInit() {
    geolocation.enableLocationRequest()
        .then(() => {
           geolocation.getCurrentLocation({ desiredAccuracy: Accuracy.high, maximumAge: 5000, timeout: 20000 })
           .then((location) => {
               console.log(location);
               this.lat = location.latitude;
               this.long = location.longitude;
           })
        })
  }

}
