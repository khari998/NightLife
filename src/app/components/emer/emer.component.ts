import { Component, OnInit } from '@angular/core';
import { AddGuardianService } from '../../add-guardian.service';

@Component({
  selector: 'ns-emer',
  templateUrl: './emer.component.html',
  styleUrls: ['./emer.component.css']
})
export class EmerComponent implements OnInit {
//     guardians = [
//     {name: 'omar', phone: '504-444-4444'},
//     {name: 'chris', phone: '504-555-5555'},
//     {name: 'khari', phone: '504-555-5555'},
// ]
  constructor(public addGuardianService: AddGuardianService) { }

  ngOnInit() {
  }

//   addGuardian = () => {
//     // this.guardians.push(newGuar
//     // this.addGuardianService.addContact();
//   }
}

