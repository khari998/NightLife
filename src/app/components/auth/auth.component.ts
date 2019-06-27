import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterExtensions } from 'nativescript-angular/router';
import { TextField } from 'tns-core-modules/ui/text-field';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'ns-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  moduleId: module.id
})
export class AuthComponent implements OnInit {
  form: FormGroup;
  emailControlIsValid: Boolean = true;
  passwordControlIsValid: Boolean = true;
  isLogin: Boolean = true;
  isLoading: Boolean = false;
  @ViewChild('passwordEl', { static: false }) passwordEl: ElementRef<TextField>;
  @ViewChild('emailEl', { static: false }) emailEl: ElementRef<TextField>;

  constructor(private router: RouterExtensions, private authService: AuthService) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(6)]
      })
    });

    this.form.get('email').statusChanges.subscribe(status => {
      this.emailControlIsValid = status === 'VALID';
    });

    this.form.get('password').statusChanges.subscribe(status => {
      this.passwordControlIsValid = status === 'VALID';
    });
  }

  onSubmit() {
    this.emailEl.nativeElement.focus();
    this.passwordEl.nativeElement.focus();
    this.passwordEl.nativeElement.dismissSoftInput();

    if (!this.form.valid) {
      return;
    }
    const firstName = this.form.get('firstname').value.trim();
    const lastName = this.form.get('lastname').value.trim();
    const fullName = firstName + " " + lastName;
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;
    console.log(email, password, fullName, firstName, lastName)

    this.form.reset();

    this.emailControlIsValid = true;
    this.passwordControlIsValid = true;
    this.isLoading = true;
    
    if (this.isLogin) {
      this.authService.login(email, password).subscribe(
        (resData) => {
          this.isLoading = false;
          this.router.navigate(['/home'])
        }, (error) => {
          console.log("you have an error", error)
          this.isLoading = false;
        }
      )
    } else {
      this.authService.signUp(email, password, fullName).subscribe(
        (resData) => {
          this.isLoading = false;
          this.router.navigate(['/home']);
        }, (error) => {
            this.isLoading = false;
        }
      );
    }

    

  }

  onDone() {
    this.emailEl.nativeElement.focus();
    this.passwordEl.nativeElement.focus();
    this.passwordEl.nativeElement.dismissSoftInput();
  }

  onSwitch() {
    this.isLogin = !this.isLogin;
  }
}
