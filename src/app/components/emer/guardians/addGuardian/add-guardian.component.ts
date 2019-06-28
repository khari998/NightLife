import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GuardiansComponent } from '../guardians.component';
import { RouterExtensions} from 'nativescript-angular/router';
import { AddGuardianService} from '../../../../add-guardian.service';


class Guardian {
    constructor(public name: string, public phone: string) {
    }
}

@Component({

    selector: 'ns-add-guardian-list',
    template: `
        <ActionBar title="Add A Guardian"></ActionBar>

            <StackLayout class="form">
                <TextField color="white" class="input" hint="Guardian Name" returnKeyType="next" ngModel #nameCtrl="ngModel"  (textChange)="addGuardianService.nameOnChange(nameCtrl)"  required></TextField>
                <TextField color="white" class="input" hint="Guardian Phone" keyboardType="phone" returnKeyType="done" ngModel #phoneCtrl="ngModel" required
                (textChange)="addGuardianService.phoneOnChange(phoneCtrl)"
                ></TextField>
                <Label color="white" *ngIf="!nameCtrl.valid && nameCtrl.touched" text="Please Enter Guardian Information"></Label>
                <Button class="btn" text="Submit" marginTop="20" (tap)="addGuardianService.addContact()" [isEnabled]="nameCtrl.valid && phoneCtrl.valid "></Button>
            </StackLayout>
    `
})

export class AddGuardianComponent implements OnInit {

    @Input() handleSubmit;

    selected = {};


    constructor(private router: Router, private extension: RouterExtensions, public addGuardianService: AddGuardianService) {}
    ngOnInit(): void {
        // console.log(this.newAngel)
    }


    // onSubmit(name: string, phone: string) {
    //     // addAngel.emit()
    //     // console.log(this.handleSubmit);
    //     // this.clickMe({name: name, phone: phone})
    //     console.log(name, phone);
    //     // this.extension.backToPreviousPage();
    // }
}


