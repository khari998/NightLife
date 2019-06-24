import { Component, OnInit } from '@angular/core';
import { registerElement } from "nativescript-angular/element-registry";
//registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);
import { Marker, Position } from 'nativescript-google-maps-sdk';
import * as geolocation from "nativescript-geolocation";
import { Accuracy } from "tns-core-modules/ui/enums"; // used to describe at what accuracy the location should be get
import { mapboxAPI } from '../../../../config';
import { FourSquareService } from '../../services/four-square.service';
import { Observable } from 'rxjs';
import { ServerService } from '~/app/services/server.service';

registerElement("Mapbox", () => require("nativescript-mapbox").MapboxView);


@Component({
  selector: 'ns-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  moduleId: module.id,
  providers: [FourSquareService, ServerService]
})
export class MapComponent implements OnInit {

    your_token = mapboxAPI;
    nolaData;

    ctrl = this;

 onMapReady = (args) => {


    args.map.addMarkers([{
        lat: 29.95465,
        lng: -90.07507,
        title: "Your Location",
        subtitle: "New Orleans",
        selected: true,
    }
]);

    // args.map.setMapStyle("dark");

    // set markers for each item in nolaData
    this.nolaData.forEach(place => {
        let lat = place.lat || place.location.latl
        let lng = place.long || place.location.lng;
        let subtitle =  place.type || place.categories[0].name;
        args.map.addMarkers([{
            lat,
            lng,
            title: place.name,
            subtitle,
        }])
    })
};

    constructor(private FourSquareService: FourSquareService, private ServerService: ServerService) {

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

// if I do this, need to add searches to database
    // on init -- check if lat and long are in searches
    // if they are -- send back the locations assoc w/ search
    // if not, create as new search


// this below makes API call

    this.ServerService.getLocations()
        .subscribe(data => {
            this.nolaData = data;
            if (!this.nolaData.length) {
                this.FourSquareService.getLocationData()
                    .subscribe((data) => {
                        this.nolaData = data.response.venues;
                        // now post to DB
                        data.response.venues.forEach(venue => {
                            let name = venue.name || "No name";
                            let type = venue.categories[0].name || "No type";
                            let address = venue.location.address || "No address";
                            let lat = venue.location.lat;
                            let long = venue.location.lng;
                            this.FourSquareService.postLocationData(name, type, address, lat, long)
                        })
                    })
            }
        })


}
}
