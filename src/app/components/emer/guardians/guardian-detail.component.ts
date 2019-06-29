import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({

    selector: 'ns-guardian-detail',
    template: `
    <ActionBar [title]="selected.name"></ActionBar>
    <StackLayout flexDirection="column" class="list-group-item"  alignItems="center">
    <Image src="~/app/icons/soloLogo.png" height="40" [nsRouterLink]="['/home']" marginTop="10" marginBottom="20"></Image>

        <Label color="white" [text]="selected.name" marginTop="50"></Label>
        <Label color="white" [text]="selected.phone"></Label>
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
