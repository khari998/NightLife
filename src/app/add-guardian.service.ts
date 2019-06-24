import { Injectable } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

@Injectable({
  providedIn: 'root'
})
export class AddGuardianService {
 newGuardianName: string;
 newGuardianPhone: string;

currentGuardians = [
    {name: 'Omar', phone: '504-444-4444'},
    {name: 'Chris', phone: '504-555-5555'},
    {name: 'Khari', phone: '504-555-5555'},
]

  constructor(private extension: RouterExtensions) { }

    nameOnChange(input) {
        // console.log(input)
        this.newGuardianName = input.value;
    }

    phoneOnChange(input) {
        // console.log(input)
        this.newGuardianPhone = input.value;

    }

    addContact() {
        console.log(this.newGuardianName, this.newGuardianPhone)
        this.currentGuardians.push({ name: this.newGuardianName, phone: this.newGuardianPhone })
        this.extension.backToPreviousPage();
    }

}
