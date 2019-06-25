import { Component, OnInit } from '@angular/core';
import { ServerService } from '~/app/services/server.service';

@Component({
  selector: 'ns-map-comment-stream',
  templateUrl: './map-comment-stream.component.html',
  styleUrls: ['./map-comment-stream.component.css'],
  moduleId: module.id,
})
export class MapCommentStreamComponent implements OnInit {

  constructor(private ServerService: ServerService) { }

  comments: any = [];

  ngOnInit() {
      this.ServerService.getComments()
      .subscribe(data => {
          this.comments = data;
      })
  }

}
