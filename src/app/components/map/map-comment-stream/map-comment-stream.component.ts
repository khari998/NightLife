import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ServerService } from '~/app/services/server.service';


@Component({
  selector: 'ns-map-comment-stream',
  templateUrl: './map-comment-stream.component.html',
  styleUrls: ['./map-comment-stream.component.css'],
  moduleId: module.id,
})
export class MapCommentStreamComponent implements OnInit {
    @Input() public map;
    @Input() public mapC;

  constructor(
      public ServerService: ServerService,
    private ref: ChangeDetectorRef
    ) { }

  comments: any = [];

  marker: any;

  removeMarker(mappy, locationId) {
    mappy.removeMarkers([locationId]);
  }

  addMarker(mappy, data) {
      mappy.addMarkers(data);
  }

  commentStream2(marker) {
    console.log('close bitch');
    this.ServerService.marker = marker;
    this.ServerService.renderCommentStream = !this.ServerService.renderCommentStream;
          this.ServerService.getLocations()
              .subscribe((data: Array<any>) => {
                  data.forEach(location => {
                      // set current location on service to location that matches marker lat and long
                      if (marker.lat === location.lat && marker.lng === location.long) {
                          this.ServerService.currentLocation = location;
                      }
                  })
                  this.mapC.ref.detectChanges();
                })

  };

  ngOnInit() {
      const diffHours = (t2, t1) => {
          let diff = (t2.getTime() - t1.getTime()) / 1000;
          diff /= (60 * 60);
          return Math.abs(Math.round(diff));
      };
      let newDate = new Date();
      this.ServerService.getComments()
      .subscribe((data: Array<any>) => {
          this.comments = data.filter( comment => {
            let num = diffHours(newDate, comment.createdAt)
            return num <= 2;
          })
          //console.log(this.comments);
      })
      console.log(this.ServerService.currentLocation);
  }

  hotTap(locationId) {
    this.ServerService.likeLocation(locationId);
    // remove marker, add marker
    this.removeMarker(this.map, locationId);
    // call add Marker to same location as before -- it is saved in the service currentLocation

    // make sure icon is conditional based on rating moving up by 1
    let icon;
      this.ServerService.currentLocation.rating_avg++;

    for (let i = 0; i < this.ServerService.icons.length; i++) {
        let newIndex;
        if (this.ServerService.currentLocation.rating_avg >= 3) {
            newIndex = 3
        } else if (this.ServerService.currentLocation.rating_avg <= 0) {
            newIndex = 0
        } else {
            newIndex = this.ServerService.currentLocation.rating_avg
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
        onTap: this.commentStream2.bind(this),
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
      this.removeMarker(this.map, locationId);
      let icon;
      this.ServerService.currentLocation.rating_avg--;
      for (let i = 0; i < this.ServerService.icons.length; i++) {
          let newIndex;
          if (this.ServerService.currentLocation.rating_avg >= 3) {
              newIndex = 3
          } else if (this.ServerService.currentLocation.rating_avg <= 0) {
              newIndex = 0
          } else {
              newIndex = this.ServerService.currentLocation.rating_avg
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
          onTap: this.commentStream2.bind(this),
          onCalloutTap: () => {
              console.log('tapped');
          }
      }
      const dataArr = []
      dataArr.push(data);
      this.addMarker(this.map, dataArr);

  }

}

