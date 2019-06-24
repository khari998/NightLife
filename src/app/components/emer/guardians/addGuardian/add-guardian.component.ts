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
    <FlexboxLayout class="form">
    <StackLayout class="input-field">
    <TextField class="input" hint="Guardian Name" returnKeyType="next" ngModel #nameCtrl="ngModel" required></TextField>
    <TextField class="input" hint="Guardian Phone" returnKeyType="done" ngModel #phoneCtrl="ngModel" required></TextField>
    <Button text="Submit" marginTop="20" (tap)="onSubmit(nameCtrl.value, phoneCtrl.value)"></Button>
    <Label [text]="nameCtrl.value"></Label>
    </StackLayout>
    </FlexboxLayout>
    `
})

export class AddGuardianComponent implements OnInit {

    guardians = [];
    selected = {};
    constructor(private router: Router) {}
    ngOnInit(): void {
    }

    onSubmit(name: string, phone: string) {
        console.log(name, phone)
    }
}


