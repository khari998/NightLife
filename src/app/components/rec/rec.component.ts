import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';

@Component({
  selector: 'ns-rec',
  templateUrl: './rec.component.html',
  styleUrls: ['./rec.component.css'],
  moduleId: module.id,
  providers: [ServerService]
})
export class RecComponent implements OnInit {

  constructor(private ServerService: ServerService) { }

  locations;
  location;

  Math = Math;

  ngOnInit() {

    this.ServerService.getLocations()
    .subscribe((data) => {
        this.locations = data;
        this.location = this.locations[Math.floor(Math.random() * this.locations.length)]
    }, (error) => {
        console.log(error);
    });
  }

  // need to make an HTTP request to server to give back data from /locations
    // this http request is in server service
  // math.random for all locations for now

}
