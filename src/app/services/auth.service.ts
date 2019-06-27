import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FIREBASE_API_KEY } from "../../../config";
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { alert } from 'tns-core-modules/ui/dialogs';
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

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
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

  private handleSignIn(
    email: string,
    token: string,
    userId: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
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