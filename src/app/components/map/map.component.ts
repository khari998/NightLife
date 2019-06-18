import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { registerElement } from "nativescript-angular/element-registry";
registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);

@Component({
  selector: 'ns-map',
    template: `
    <GridLayout>
        <MapView (mapReady)="onMapReady($event)"></MapView>
    </GridLayout>
    `
})
export class MapComponent implements OnInit {

@ViewChild("MapView", null) mapView: ElementRef;

 onMapReady = (event) => {
    console.log("Map Ready");
};
  constructor() { }

  ngOnInit() {

  }

}
