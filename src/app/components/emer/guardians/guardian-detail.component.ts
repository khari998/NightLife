import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({

    selector: 'ns-guardian-detail',
    template: `
    <ActionBar [title]="selected.name"></ActionBar>
    <FlexboxLayout flexDirection="column" class="list-group-item"  alignItems="center">
        <Label [text]="selected.name" marginTop="50"></Label>
        <Label [text]="selected.email"></Label>
        <Label [text]="selected.phone"></Label>
    </FlexboxLayout>
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
