import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

class Guardian {
    constructor(public name: string, public email: string, public phone: string) {
    }
}

@Component({
    selector: 'ns-guardians-list',
    template: `
    <ActionBar title="Guardians"></ActionBar>
    <ListView height="150" [items]="guardians" class="list-group" (itemTap)="onSelect($event)">
        <ng-template let-item="item">
        <StackLayout class="list-group-item">
        <Label [text]="item.name"></Label>
        </StackLayout>
        </ng-template>
    </ListView>
    `
})

export class GuardiansComponent implements OnInit {

    guardians = [];
    selected = {};
    constructor(private router: Router) {}
    // constructor() {
    //     this.guardians = [
    //         {name: 'omar', email: 'omar@omar.com', phone: '504-444-4444'},
    //         {name: 'chris', email: 'chris@chris.com', phone: '504-555-5555'},
    //         {name: 'khari', email: 'khari@khari.com', phone: '504-555-5555'},
    //     ]
        // }
    ngOnInit(): void {
        this.guardians.push(
            {name: 'omar', email: 'omar@omar.com', phone: '504-444-4444'},
            {name: 'chris', email: 'chris@chris.com', phone: '504-555-5555'},
            {name: 'khari', email: 'khari@khari.com', phone: '504-555-5555'},
        )
    }

    onSelect(args) {
        // const selectedGuardian = this.guardians[args.index]
        // console.log(`This guardian was selected: ${selectedGuardian.name}`)
        this.selected = this.guardians[args.index]

        this.router.navigate(["/guardian"], {
            queryParams: { selected: JSON.stringify(this.selected)}
        })
    }
}

