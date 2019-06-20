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
    nolaData;

 onMapReady = (args) => {


    args.map.addMarkers([{
        lat: 29.95465,
        lng: -90.07507,
        title: "Your Location",
        subtitle: "New Orleans",
        selected: true,
    }
]);

    args.map.setMapStyle("dark");

    // set markers for each item in nolaData
    this.nolaData.forEach(place => {
        args.map.addMarkers([{
            lat: place.location.lat,
            lng: place.location.lng,
            title: place.name,
            subtitle: place.categories[0].name,
        }])
    })
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
            this.nolaData = data.response.venues;
        },
        (error) => {
            console.log(error);
        },
        () => {
            console.log('Observer complete')
        })

}
}
