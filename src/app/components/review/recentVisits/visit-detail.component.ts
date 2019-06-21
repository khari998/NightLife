import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// class Visit {
//     constructor(public id: number, public venue: string, public city: string) {
//     }
// }

@Component({

    // selector: 'ns-visited',
    template: `
    <ActionBar [title]="selected.venue"></ActionBar>
        <StackLayout class="list-group-item">
        <Label [text]="selected.city"></Label>
        <Label [text]="selected.id"></Label>
        </StackLayout>
    `
})

export class VisitDetailComponent implements OnInit{
    selected = {};

    // constructor() {
    //     this.visit = [
    //         { id: 0, venue: 'freezy street', city: 'new orleans' },
    //         { id: 1, venue: 'buds broiler', city: 'new orleans' },
    //         { id: 2, venue: 'buffalo wild wings', city: 'metairie' },
    //         { id: 3, venue: 'pagoda', city: 'new orleans' },
    //         { id: 4, venue: 'chipotle', city: 'kenner' },
    //         { id: 5, venue: 'poke loa', city: 'harrahan' },
    //         { id: 6, venue: 'the rum house', city: 'new orleans' },
    //         { id: 7, venue: 'panda express', city: 'metairie' },
    //         { id: 8, venue: 'five guys burger and fries', city: 'harrahan' },
    //         { id: 9, venue: 'cajuns seafood', city: 'new orleans' },
    //         { id: 10, venue: 'nacho mamas', city: 'kenner' },
    //     ]
    // }

    // onSelect(args) {
    //     const selectedSpot = this.visit[args.index]
    //     // console.log(`This recently visited place was selected: ${selectedSpot.venue}`)
    // }

    // getItem(id: number): Visit {
    //     return this.visit.filter((item) => {
    //         return item.id === id;
    //     })[0];
    // }
    constructor(private route: ActivatedRoute) {
        this.route.queryParams.subscribe(params => {
            this.selected = JSON.parse(params["selected"]);
        });
    }

    ngOnInit(): void {}
}
