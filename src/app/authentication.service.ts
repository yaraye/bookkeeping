import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import { LocalStorageService } from 'angular-2-local-storage';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  //***/ here every time the value change informs you
  authenticateState = new BehaviorSubject(false);

  constructor(private http: HttpClient, private localS: LocalStorageService) {}
   login(username, password) {
    //this returns a promise
    return this.http.post('http://127.0.0.1:5000/login',
    {'username' : username, 'password': password});
  }
  // ***/ return the AuthenticationService by creating observable--to know the actual value that was entered 
  isUserLoggedIn(){
    return this.authenticateState.asObservable();
  }

  getLoggedInUserData() {
    let userData =  this.localS.get('LOGGED_USER_DATA');
    return userData;
  }
 


  socialLogin(data) {
    //this returns a promise
    return this.http.post('http://127.0.0.1:5000/social-login',
    data);
  }
}

