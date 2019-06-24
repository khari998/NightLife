import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

// class RecentVisits {
//     constructor(public id: number, public venue: string, public city: string) {

//     }
// }

@Component({

    selector: 'ns-visited-list',
    template: `
    <ActionBar title="Recently Visited"></ActionBar>
    <GridLayout col="0" class="left-column">

    <!-- The ListView shows on both tablets and phones. On tablets the list occupies the left-hand side
    of the screen, and one phones the ListView takes up the whole screen. -->
    <ListView class="list-group" [items]="spots" (itemTap)="select($event)">
    <ng-template let-item="item">
    <GridLayout class="list-group-item" rows="*" columns="auto, *">
    <Label row="0" col="1" [text]="item.venue"></Label>
    </GridLayout>
    </ng-template>
    </ListView>
	</GridLayout>
    `
})

// <ListView [items]="spots" class="list-group" (itemTap)="select($event)">
// <ng-template let-item="item">
// <StackLayout class="list-group-item">
//     <Label [text]="item.venue"></Label>
//     </StackLayout>
//     </ng-template>
// </ListView>


export class VisitsComponent implements OnInit {
    spots = [];
    selected = {};
    constructor(private router: Router) {}

    // constructor() {
    //     this.spots = [
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

    select(args) {
        this.selected = this.spots[args.index];

        // For phone users we need to navigate to another page to show the detail view.
        this.router.navigate(["/visited"], {
            queryParams: { selected: JSON.stringify(this.selected) }
        });
        // console.log(this.selected);
    }

    ngOnInit(): void {
        this.spots.push({
            id: 0,
            venue: 'krusty krab',
            city: 'bikini bottom',
            address: '4563 Bubble Road',
            src: "https://data.whicdn.com/images/96807006/large.png",
            description: 'Better than the Chum Bucket',
            type: 'burger joint',
            comments:
                {
                    name: 'spongebob',
                    comment: ['I work here and love it']
                },
        })
        this.spots.push({
            id: 1,
            venue: 'dunkin donuts',
            city: 'new orleans',
            address: '58 Lakeside Mall',
            src: "https://bit.ly/2x6p2EC",
            description: 'Best middle of the mall ice cream out there',
            type: 'ice cream spot',
            comments:
                {
                    name: 'jimmy',
                    comment: ['Ice cream taste great']
                },
        })
        this.spots.push({
            id: 2,
            venue: 'mcdonalds',
            city: 'new orleans',
            address: '9172 Elysian Fields',
            src: "https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/mcdonalds-512.png",
            description: 'At least our meat is somewhat real',
            type: 'fast food',
            comments:
                {
                    name: 'stephen',
                    comment: ['Service was horrendous']
                },
        })
        this.spots.push({
            id: 3,
            venue: 'chick-fil-a',
            city: 'metairie',
            address:'1000 Veterans Blvd',
            src: "https://adc3ef35f321fe6e725a-fb8aac3b3bf42afe824f73b606f0aa4c.ssl.cf1.rackcdn.com/tenantlogos/1073.png",
            description: 'Spicy chicken taste like heaven on bun',
            type: 'fine dining',
            comments:
                {
                    name: 'Chris',
                    comment: ['I love that gosh darn Spicy Chicken Deluxe']
                },
        })
        this.spots.push({
            id: 4,
            venue: 'applebees',
            city: 'los angeles',
            address: '873 Hollywood Blvd',
            src: "https://adc3ef35f321fe6e725a-fb8aac3b3bf42afe824f73b606f0aa4c.ssl.cf1.rackcdn.com/tenantlogos/281.png",
            description: 'Two for Twenty the best deal',
            type: 'resturant',
            comments:
                {
                    name: 'tia',
                    comment: ['Food is nice, but the portions are way to small']
                },
        })
        this.spots.push({
            id: 5,
            venue: 'hard rock cafe',
            city: 'london',
            address: '9123 Buckingham Ln',
            src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Hard_Rock_Cafe_Logo.svg/1024px-Hard_Rock_Cafe_Logo.svg.png",
            description: 'Hard Rock Prices should be our name',
            type: 'resturant',
            comments:
                {
                    name: 'Pete',
                    comment: ['The music is too loud. I have to yell to talk']
                },
        })
        this.spots.push({
            id: 6,
            venue: 'rasing canes',
            city: 'new orleans',
            address: '5612 Gentilly Blvd',
            src: "https://www.scrapehero.com/store/wp-content/uploads/2018/07/RAISING-CANE.png",
            description: 'Better eat before the chicken start sweating out',
            type: 'fast food',
            comments:
                {
                    name: 'alana',
                    comment: ['The lemonade is too strong']
                },
        })
        this.spots.push({
            id: 7,
            venue: 'panda express',
            city: 'metairie',
            address: '1050 Veterans Blvd',
            src: "https://adc3ef35f321fe6e725a-fb8aac3b3bf42afe824f73b606f0aa4c.ssl.cf1.rackcdn.com/tenantlogos/4424.png",
            description: 'Panda Panda Panda',
            type: 'fast food',
            comments:
                {
                    name: 'desiinger',
                    comment: []
                },
        })
        this.spots.push({
            id: 8,
            venue: 'buffalo wild wings',
            city: 'harrahan',
            address: '6729 Elmwood',
            src: "https://somi.org/img/sponsor/buffalo-wild-wings-800px.png",
            description: 'Biggest scam since food at an airport',
            type: 'wing spot',
            comments:
                {
                    name: 'ricky rozay',
                    comment: ['Pretty good, but not better than wingstop']
                },
        })
        this.spots.push({
            id: 9,
            venue: 'felipes',
            city: 'new orleans',
            address: '3781 Carrollton Ave',
            src: "https://res.cloudinary.com/grubhub/image/upload/w_1200,h_800,f_auto,fl_lossy,q_80,c_fit/rtocacelorw6exd56m2v",
            description: 'Sir, the guac is extra',
            type: 'mexican',
            comments:
                {
                    name: 'keith',
                    comment: ['Friendly workers']
                },
        })
        this.spots.push({
            id: 10,
            venue: 'taco bell',
            city: 'kenner',
            address: '9855 Williams Blvd',
            src: "https://adc3ef35f321fe6e725a-fb8aac3b3bf42afe824f73b606f0aa4c.ssl.cf1.rackcdn.com/tenantlogos/5922.png",
            description: 'Lifetime supply of tacos for whoever can guess what our meat is made of',
            type: 'fast food',
            comments:
                {
                    name: 'raymond',
                    comment: ['Food was ready quick, but its taste left much to be desired']
                },
        })
    }

    // onSelect(args) {
    //     const selectedSpot = this.spots[args.index]
    //     console.log(selectedSpot);
    //     // console.log(`This recently visited place was selected: ${selectedSpot.venue}`)

    // }

    // getItem(id: number): RecentVisits {
    //     return this.spots.filter((item) => {
    //         // console.log(item);
    //         return item.id === id;
    //     })[0];
    // }
}
