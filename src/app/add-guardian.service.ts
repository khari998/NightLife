import { Injectable } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { HttpClient } from '@angular/common/http';
import { serverURL } from '../../config'
// import htttp client from angular

//inject http into constructor
// create function for SOS feature
    // return this.http.post
        // 1st param is url
        // ngrok https
        // 2nd param body
@Injectable({
  providedIn: 'root'
})
export class AddGuardianService {
 newGuardianName: string;
 newGuardianPhone: string;

phoneNumber:`15044106484`;

url: string = serverURL;
endpoint: string = '/sms';
addEnd: string = '/addGuardian';
sosMessage = `*Current User* has indicated they are experiencing an emergency. Please contact them and / or the authorities`;

currentGuardians = [
    {name: 'Omar', phone: '504-444-4444'},
    {name: 'Chris', phone: '504-555-5555'},
    {name: 'Khari', phone: '504-555-5555'},
]

  constructor(private extension: RouterExtensions, public http: HttpClient) { }

    nameOnChange(input) {
        console.log(input)
        this.newGuardianName = input.value;
    }

    phoneOnChange(input) {
        console.log(input)
        this.newGuardianPhone = input.value;

    }

    addContact() {
        console.log(this.newGuardianName, this.newGuardianPhone)
        this.currentGuardians.push({ name: this.newGuardianName, phone: this.newGuardianPhone })
        this.extension.backToPreviousPage();

        return this.http.post(`${this.url}${this.addEnd}`, { name: this.newGuardianName, phone: this.newGuardianPhone })
        .subscribe( data => {
            console.log(data)
        },
        error => {
            console.log(error)
        })
    }


}
