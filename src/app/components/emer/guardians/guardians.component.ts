import { Component, OnInit, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { AddGuardianComponent} from './addGuardian/add-guardian.component';

class Guardian {
    constructor(public name: string, public phone: string) {
    }
}

@Component({
    selector: 'ns-guardians-list',
    template: `
        <ActionBar title="Guardians"></ActionBar>
        <ListView height="250" [items]="guardians" class="list-group" (itemTap)="onSelect($event)">
            <ng-template let-item="item">
                <StackLayout class="list-group-item">
                    <Label [text]="item.name"></Label>
                </StackLayout>
            </ng-template>
        </ListView>
        `
    })

export class GuardiansComponent implements OnInit {


    @Input() guardians;

    selected = {};
    constructor(private router: Router) {}

    ngOnInit(): void {
    }

    onSelect(args) {
        this.selected = this.guardians[args.index]

        this.router.navigate(["/guardian"], {
            queryParams: { selected: JSON.stringify(this.selected)}
        })
    }
}

