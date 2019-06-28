import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ServerService } from '../../../services/server.service';

// class RecentVisits {
//     constructor(public id: number, public venue: string, public city: string) {

//     }
// }

@Component({

    selector: 'ns-visited-list',
    // templateUrl: './visits.component.html'
    template: `
<<<<<<< HEAD
    <ListView [items]="locations" class="list-group" (itemTap)="select($event)">
=======
    <GridLayout col="0" class="left-column">
    
    <!-- The ListView shows on both tablets and phones. On tablets the list occupies the left-hand side
    of the screen, and one phones the ListView takes up the whole screen. -->
    <ListView class="list-group" [items]="spots" (itemTap)="select($event)">
>>>>>>> faa3944b3352ca4e0d3328d6e433d55e4eceb8d3
    <ng-template let-item="item">
    <StackLayout class="list-group-item">
        <Label [text]="item.name"></Label>
        </StackLayout>
        </ng-template>
    </ListView>
    <ActionBar title="Recently Visited"></ActionBar>
    <GridLayout col="0" class="left-column">
    `

    // <!-- The ListView shows on both tablets and phones. On tablets the list occupies the left-hand side
    // of the screen, and one phones the ListView takes up the whole screen. -->
    // <ListView class="list-group" [items]="spots" (itemTap)="select($event)">
    // <ng-template let-item="item">
    // <GridLayout class="list-group-item" rows="*" columns="auto, *">
    // <Label row="0" col="1" [text]="item.venue"></Label>
    // </GridLayout>
    // </ng-template>
    // </ListView>
    // </GridLayout>
    ,
    moduleId: module.id,
    providers: [ServerService],
})



export class VisitsComponent implements OnInit {
    constructor(
        private router: Router,
        private serverService: ServerService,
    ) { }

    locations;
    location = {};
    Math = Math;


    select(args) {
        this.location = this.locations[args.index];
        this.serverService.currentLocation = this.locations[args.index];
        console.log(this.serverService.currentLocation);

        // For phone users we need to navigate to another page to show the detail view.
        this.router.navigate(["/visited"], {
            queryParams: { location: JSON.stringify(this.location) }
        });
    }

    ngOnInit() {
        this.serverService.getLocations()
        .subscribe((data) => {
            this.locations = data;
            console.log(data);
            this.location = this.locations
        }, (err) => {
            console.log(err);
            });
        console.log(this.location)
        }
}
