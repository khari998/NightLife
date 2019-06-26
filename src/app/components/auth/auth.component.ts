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
  emailControlIsValid = true;
  passwordControlIsValid = true;
  isLogin = true;
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
    console.log(this.form.valid)
    if (!this.form.valid) {
      return;
    }

    const email = this.form.get('email').value;
    const password = this.form.get('password').value;
    console.log(email, password)
    this.form.reset();
    this.emailControlIsValid = true;
    this.passwordControlIsValid = true;

    if (this.isLogin) {
      console.log('Logging in...');
    } else {
      this.authService.signUp(email, password);
    }

    this.router.navigate(['/home']);

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
