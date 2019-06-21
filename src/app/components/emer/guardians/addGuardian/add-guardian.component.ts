import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

class Guardian {
    constructor(public name: string, public email: string, public phone: string) {
    }
}

@Component({

    selector: 'ns-add-guardian-list',
    template: `
    <ActionBar title="Add A Guardian"></ActionBar>

    `
})

export class AddGuardianComponent implements OnInit {

    guardians = [];
    selected = {};
    constructor(private router: Router) {}
    ngOnInit(): void {
    }
}


