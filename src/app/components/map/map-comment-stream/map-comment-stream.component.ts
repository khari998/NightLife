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

  constructor(public ServerService: ServerService) { }

  comments: any = [];

  marker: any;

  removeMarker(mappy, locationId) {
    console.log(mappy, locationId);
    mappy.removeMarkers([locationId]);
  }

  ngOnInit() {
      this.ServerService.getComments()
      .subscribe(data => {
          this.comments = data;
          console.log(this.comments);
      })
  }

  hotTap(locationId) {
    this.ServerService.likeLocation(locationId);
  }

  coldTap(locationId) {
      this.ServerService.dislikeLocation(locationId);
  }

}

