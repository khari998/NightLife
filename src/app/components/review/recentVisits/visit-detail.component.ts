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
        <StackLayout orientation="vertical" class="m-x-auto">
            <Image [src]="selected.src" width="210"></Image>
            <Label style="text-align: center" class="h2" [text]="selected.city"></Label>
            <Label style="text-align: center" class="body" [text]="selected.address"></Label>
            <Label style="text-align: center" class="h3; font-italic" textWrap="true" [text]="'- ' + selected.description"></Label>
            <StackLayout class="hr-light m-10"></StackLayout>
                <Label style="text-align: center" class="h4" text="Comments"></Label>
                <StackLayout>
                <Label style="text-align: center" class="h1 ; font-bold" [text]="selected.comments.name"></Label>
                <Label style="text-align: center" class="h3 ; font-italic" textWrap="true" [text]="selected.comments.comment.join(' ')"></Label>
                </StackLayout>
                <StackLayout class="input-field ; m-x-5">
                <TextField class="input" hint="Comments" returnKeyType="next" ngModel #comment="ngModel" required></TextField>
                <Button text="Submit" marginTop="20" (tap)="onSubmit(comment.value)"></Button>
                </StackLayout>
        </StackLayout>
    `
})

export class VisitDetailComponent implements OnInit{
    selected = {
        comments: {
            name: '',
            comment: [],
    } };

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

    onSubmit(comment: string) {
        this.selected.comments.comment.unshift('- ' + comment + '\n');
        // console.log('hmr')
    }

    ngOnInit(): void {}
}
