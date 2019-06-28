import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, of } from 'rxjs';
import { alert } from 'tns-core-modules/ui/dialogs';
import { RouterExtensions } from "nativescript-angular/router";
import {
  setString,
  getString,
  hasKey,
  remove
} from 'tns-core-modules/application-settings';

import { FIREBASE_API_KEY } from "../../../config";
import { User } from '../../app/components/auth/user.model';


interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: number;

  constructor(private http: HttpClient, private router: RouterExtensions) { }

  signUp(email: string, password: string, name: string) {
    this.http.post("/signup", { email, password, name })
    
    return this.http.post<AuthResponseData>(
      `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${FIREBASE_API_KEY}`,
      { email: email, password: password, returnSecureToken: true }
    ).pipe(
      catchError(errorRes => {
        this.handleError(errorRes.error.error.message);
        return throwError(errorRes);
      }),
      tap(resData => {
        if (resData && resData.idToken) {
          this.handleSignIn(
            email,
            resData.idToken,
            resData.localId,
            parseInt(resData.expiresIn)
          );
        }
      })
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${FIREBASE_API_KEY}`,
      { email: email, password: password, returnSecureToken: true }
    ).pipe(
      catchError(errorRes => {
        this.handleError(errorRes.error.error.message);
        return throwError(errorRes);
      }),
      tap(resData => {
        if (resData && resData.idToken) {
          this.handleSignIn(
            email,
            resData.idToken,
            resData.localId,
            parseInt(resData.expiresIn)
          );
        }
      })
    )
  }

  autoLogin() {
    if (!hasKey('userData')) {
      return of(false);
    }
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(getString('userData'));

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    

    if (loadedUser.isAuth) {
      this._user.next(loadedUser);
      this.autoLogout(loadedUser.timeToExpiry);
      this.router.navigate(['/home'], { clearHistory: true });
      return of(true);
    }
    return of(false);
  }

  logout() {
    this._user.next(null);
    remove('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.router.navigate(['/'], { clearHistory: true });
  }

  autoLogout(expiryDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => this.logout(), expiryDuration);
  }

  private handleSignIn(
    email: string,
    token: string,
    userId: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1); // remove '* 1000' to logout in 3.6 seconds for development
    const user = new User(email, userId, token, expirationDate);
    setString('userData', JSON.stringify(user));
    this.autoLogout(user.timeToExpiry)
    this._user.next(user);
  }

  private handleError(errorMessage: string) {
    switch (errorMessage) {
      case "EMAIL_EXISTS":
        alert("This email address is already in our system.");
        break;
      case "EMAIL_NOT_FOUND":
        alert("This email address does not exist in our system.");
        break;
      case "USER_DISABLED":
        alert("This user account has been disabled.");
        break;
      case "INVALID_PASSWORD":
        alert("Your password is invalid.");
        break;
      case "TOO_MANY_ATTEMPTS_TRY_LATER":
        alert("There have been too many attempts to access this account. Try again in an hour.");
        break;
      default:
        alert("Authentication failed, check your credentials.");
    }
  }
  
};