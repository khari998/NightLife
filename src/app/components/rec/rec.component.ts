import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';
import { AuthService } from '~/app/services/auth.service';

@Component({
  selector: 'ns-rec',
  templateUrl: './rec.component.html',
  styleUrls: ['./rec.component.css'],
  moduleId: module.id,
  providers: [ServerService]
})
export class RecComponent implements OnInit {

  constructor(private ServerService: ServerService,
    public AuthService: AuthService
    ) { }

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

    this.AuthService.getUser(this.AuthService.userEmail)
      .subscribe((data) =>{
          console.log('BYABSYBJHBJSHB');
          console.log(data[0]);
          this.AuthService.userObj = data[0];
      })

  }

}
