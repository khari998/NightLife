import { Component, OnInit, Input } from '@angular/core';
import { ServerService } from '~/app/services/server.service';


@Component({
  selector: 'ns-map-comment-stream',
  templateUrl: './map-comment-stream.component.html',
  styleUrls: ['./map-comment-stream.component.css'],
  moduleId: module.id,
})
export class MapCommentStreamComponent implements OnInit {
    @Input() public map
    @Input() public changeState

  constructor(public ServerService: ServerService) { }

  comments: any = [];

  marker: any;

  removeMarker(mappy, locationId) {
    mappy.removeMarkers([locationId]);
  }

  addMarker(mappy, data) {
      mappy.addMarkers(data);
  }

  ngOnInit() {
      this.ServerService.getComments()
      .subscribe(data => {
          this.comments = data;
          //console.log(this.comments);
      })
    //   console.log(this.changeState)
    //   console.log(this.ServerService.currentLocation);
  }

  hotTap(locationId) {
    this.ServerService.likeLocation(locationId);
    // remove marker, add marker
    this.removeMarker(this.map, locationId);
    // call add Marker to same location as before -- it is saved in the service currentLocation

    // make sure icon is conditional based on rating moving up by 1
    let icon;

    for (let i = 0; i < this.ServerService.icons.length; i++) {
        let newIndex;
        if (this.ServerService.currentLocation.rating_avg + 1 >= 3) {
            newIndex = 3
        } else if (this.ServerService.currentLocation.rating_avg + 1 <= 0) {
            newIndex = 0
        } else {
            newIndex = this.ServerService.currentLocation.rating_avg + 1
        }
        icon = this.ServerService.icons[newIndex]
    }

    const data = {
        id: this.ServerService.currentLocation.id,
        lat: this.ServerService.currentLocation.lat,
        lng: this.ServerService.currentLocation.long,
        title: this.ServerService.currentLocation.name,
        subtitle: this.ServerService.currentLocation.type,
        icon,
        onTap: () => {
            // this needs to be old onTap function
            // console.log(changeState)
            console.log('tapped');
        },
        onCalloutTap: () => {
            console.log('tapped');
        }
    }
    const dataArr = []
    dataArr.push(data);
    this.addMarker(this.map, dataArr);

  }

  coldTap(locationId) {
      this.ServerService.dislikeLocation(locationId);
  }

}

