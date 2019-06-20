import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ns-place-item',
  templateUrl: './place-item.component.html',
  styleUrls: ['./place-item.component.css'],
  moduleId: module.id,
})
export class PlaceItemComponent implements OnInit {

  @Input() place;

  constructor() { }

  ngOnInit() {
      console.log(this.place.name);
  }

}
