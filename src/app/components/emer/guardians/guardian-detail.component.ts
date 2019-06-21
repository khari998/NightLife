import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({

    selector: 'ns-guardian-detail',
    template: `
    <ActionBar [title]="selected.name"></ActionBar>
    <StackLayout class="list-group-item">
        <Label [text]="selected.name"></Label>
        <Label [text]="selected.email"></Label>
        <Label [text]="selected.phone"></Label>
    </StackLayout>
    `
})

export class GuardianDetailComponent implements OnInit{
    selected = {};

    constructor(private route: ActivatedRoute) {
        this.route.queryParams.subscribe( params => {
            this.selected = JSON.parse(params['selected']);
        })
    }

    ngOnInit():void {}
}
