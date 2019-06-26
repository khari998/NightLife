import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { registerElement } from "nativescript-angular/element-registry";
//registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);
import { Marker, Position } from 'nativescript-google-maps-sdk';
import * as geolocation from "nativescript-geolocation";
import { Accuracy } from "tns-core-modules/ui/enums"; // used to describe at what accuracy the location should be get
import { mapboxAPI } from '../../../../config';
import { FourSquareService } from '../../services/four-square.service';
import { Observable } from 'rxjs';
import { ServerService } from '~/app/services/server.service';
import { Image } from "tns-core-modules/ui/image";

registerElement("Mapbox", () => require("nativescript-mapbox").MapboxView);


@Component({
    selector: "ns-map",
    templateUrl: "./map.component.html",
    styleUrls: ["./map.component.css"],
    moduleId: module.id,
    providers: [FourSquareService, ServerService]
})
export class MapComponent implements OnInit {
    constructor(
        private FourSquareService: FourSquareService,
        public ServerService: ServerService,
        private ref: ChangeDetectorRef
    ) {}

    your_token = mapboxAPI;
    nolaData;
    renderCommentStream = false;


    changeCommentStreamState(marker) {
        this.ServerService.marker = marker;
        this.renderCommentStream = !this.renderCommentStream
        this.ServerService.getLocations()
            .subscribe((data: Array<any>) => {

                data.forEach(location => {
                    // set current location on service to location that matches marker lat and long
                    if (marker.lat === location.lat && marker.lng === location.long) {
                        this.ServerService.currentLocation = location;
                    }
                })
                this.ref.detectChanges();
                console.log(this.ServerService.currentLocation, this.ServerService.marker);
            })

    };


    onMapReady = args => {
        args.map.addMarkers([
            {
                lat: 29.95465,
                lng: -90.07507,
                title: "Your Location",
                subtitle: "New Orleans",
                selected: true,
            }
        ]);

        // args.map.setMapStyle("dark");

        // set markers for each item in nolaData
        if (this.nolaData.length) {
            this.nolaData.forEach((place) => {
                let lat = place.lat || place.location.lat;
                let lng = place.long || place.location.lng;
                let subtitle = place.type || place.categories[0].name;
                args.map.addMarkers([
                    {
                        lat,
                        lng,
                        title: place.name,
                        subtitle,
                        icon: "res://number_0",
                        onTap: this.changeCommentStreamState.bind(this),
                        //onCalloutTap: this.changeCommentStreamState.bind(this)

                        // (marker) => {
                        //     console.log(marker.lat, marker.title);
                        //     console.log(this);
                        //     this.changeCommentStreamState();
                        // }
                    }
                ]);
            });
        }
    };

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

        this.ServerService.getLocations().subscribe(data => {
            this.nolaData = data;
            if (!this.nolaData.length) {
                this.FourSquareService.getLocationData().subscribe(data => {
                    const arr = [];
                    data.response.venues.forEach(venue => {
                        const obj = {
                            name: "",
                            type: "",
                            address: "",
                            lat: "",
                            long: ""
                        };
                        obj.name = venue.name || "No name";
                        if (venue.categories) {
                            obj.type = venue.categories[0].name;
                        } else {
                            obj.type = "No type";
                        }
                        obj.address = venue.location.address || "No address";
                        obj.lat = venue.location.lat;
                        obj.long = venue.location.lng;
                        arr.push(obj);
                    });
                    this.FourSquareService.postLocationData(arr).subscribe(
                        () => {
                            this.ServerService.getLocations().subscribe(
                                data => {
                                    this.nolaData = data;
                                }
                            );
                        },
                        error => {
                            console.log(error);
                        }
                    );
                });
            } else {
                console.log("no api call made");
            }
        });
    }
}
