import { Component } from '@angular/core';

class RecentVisits {
    constructor(public id: number, public venue: string, public city: string) {

    }
}

@Component({
    selector: 'ns-visited-list',
    template: `
    <ActionBar title="ListView"></ActionBar>
    <ListView [items]="spots" class="list-group" (itemTap)="onSelect($event)">
        <ng-template let-item="item">
        <StackLayout class="list-group-item">
        <Label [text]="item.venue"></Label>
        </StackLayout>
        </ng-template>
    </ListView>
    `
})

export class VisitsComponent {
    spots: RecentVisits[];

    constructor() {
        this.spots = [
            { id: 0, venue: 'freezy street', city: 'new orleans' },
            { id: 1, venue: 'buds broiler', city: 'new orleans' },
            { id: 2, venue: 'buffalo wild wings', city: 'metairie' },
            { id: 3, venue: 'pagoda', city: 'new orleans' },
            { id: 4, venue: 'chipotle', city: 'kenner' },
            { id: 5, venue: 'poke loa', city: 'harrahan' },
            { id: 6, venue: 'the rum house', city: 'new orleans' },
            { id: 7, venue: 'panda express', city: 'metairie' },
            { id: 8, venue: 'five guys burger and fries', city: 'harrahan' },
            { id: 9, venue: 'cajuns seafood', city: 'new orleans' },
            { id: 10, venue: 'nacho mamas', city: 'kenner' },
        ]
    }

    onSelect(args) {
        const selectedSpot = this.spots[args.index]
        console.log(`This recently visited place was selected: ${selectedSpot.venue}`)

    }
}
