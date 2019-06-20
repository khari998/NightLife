import { Component, OnInit } from '@angular/core';
import { registerElement } from "nativescript-angular/element-registry";
//registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);
import { Marker, Position } from 'nativescript-google-maps-sdk';
import * as geolocation from "nativescript-geolocation";
import { Accuracy } from "tns-core-modules/ui/enums"; // used to describe at what accuracy the location should be get
import { mapboxAPI } from '../../../../config';
import { FourSquareService } from '../../services/four-square.service';
import { Observable } from 'rxjs';

registerElement("Mapbox", () => require("nativescript-mapbox").MapboxView);


@Component({
  selector: 'ns-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  moduleId: module.id,
  providers: [FourSquareService]
})
export class MapComponent implements OnInit {

    your_token = mapboxAPI;

 onMapReady = (args) => {


    args.map.addMarkers([{
        lat: 29.95465,
        lng: -90.07507,
        title: "New Orleans",
        subtitle: "Ready for a night out!?",
        selected: true,
        onCalloutTap: () => {
            console.log('tapped');
        }
    }]);

    args.map.setMapStyle("dark");
};

    constructor(private FourSquareService: FourSquareService) {

   }

  ngOnInit() {
    // geolocation.enableLocationRequest()
    //     .then(() => {
    //        geolocation.getCurrentLocation({ desiredAccuracy: Accuracy.high, maximumAge: 5000, timeout: 20000 })
    //        .then((location) => {
    //            this.lat = location.latitude;
    //            this.long = location.longitude;
    //        })
    //     })

    this.FourSquareService.getLocationData()
        .subscribe((data) => {
            console.log(data);
        },
        (error) => {
            console.log(error);
        },
        () => {
            console.log('Observer complete')
        })

}
}
