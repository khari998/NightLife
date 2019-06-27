import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FIREBASE_API_KEY } from "../../../config";


@Injectable({ providedIn: 'root' })
export class AuthService {
  
  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    return this.http.post(
      `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${FIREBASE_API_KEY}`,
      { email: email, password: password, returnSecureToken: true }
    )
  }

  login(email: string, password: string) {
    return this.http.post(
      `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${FIREBASE_API_KEY}`,
      { email: email, password: password, returnSecureToken: true }
    )
  }
  
};