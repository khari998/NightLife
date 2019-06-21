import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ns-emer',
  templateUrl: './emer.component.html',
  styleUrls: ['./emer.component.css']
})
export class EmerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  clickMe(e) {
      console.log('fuck');
  }
}
