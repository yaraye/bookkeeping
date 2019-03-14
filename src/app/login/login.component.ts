import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import{LocalStorageService} from 'angular-2-local-storage';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider} from 'angular-6-social-login';
// for decoding the token
import * as jwt_decode from "jwt-decode";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
// JavaScript objects are containers for named values called properties or methods.
  user: object;
  errorMsg: string;
// constructor and ngOnInit is that ngOnInit is lifecycle hook and runs after constructor.
// A Constructor is a special type of method of a class and it will be automatically invoked when an instance of the class is created.
  constructor(
    private router: Router, 
    private auth: AuthenticationService, 
    private socialAuthService: AuthService, 
    private localS: LocalStorageService){
  // creating empty variable    
    this.user = {
      'username': '',
      'password': ''
    };
   }
// ngOnInit () is a lifecycle hook that is called after Angular has finished initializing all data-bound properties of a directive.
  ngOnInit() {
    
  }
 
socialSignIn(socialPlateForm : string){
  let socialPlateFormProvider;
  if(socialPlateForm == "facebook"){
    socialPlateFormProvider = FacebookLoginProvider.PROVIDER_ID;
  }else if(socialPlateForm == "google"){
    socialPlateFormProvider = GoogleLoginProvider.PROVIDER_ID;
  } 
  this.socialAuthService.signIn(socialPlateFormProvider).then(
    (userData)=>{
      console.log(userData);
// subscribe-It is a method  in which is subscribed to an observable. 
// Whenever the subscribe method is called, an independent execution of the observable happens. 
    this.auth.socialLogin(userData).subscribe((data)=>{
      if(data['status']){
        this.errorMsg = '';
// to decode the token received from the user--when user log in will see the value
      const decodedToken = jwt_decode(data['token']);
    this.localS.add('USER_LOGGED_IN_KEY', 1)
    this.localS.add('LOGGED_USER_DATA', decodedToken);
//***/to update the value (app.com--line16)
    this.auth.authenticateState.next(true);
        this.router.navigate(['/members'])
      } else{
        this.errorMsg = data['message'];
        this.router.navigate(['/login'])
      } 
      })
    }
  );
  
}
  
handleSubmit(){
    this.router.navigate(['./'])
    this.auth.login(this.user['username'], this.user['password']).subscribe((data)=> {
      if(data['status']){
        this.errorMsg = '';
        const decodedToken = jwt_decode(data['token']);
        console.log(decodedToken);
// to store the token 
        this.localS.add('USER_LOGGED_IN_KEY', 1)
        this.localS.add('LOGGED_USER_DATA', decodedToken);
        this.auth.authenticateState.next(true);
        this.router.navigate(['/members'])
      } else{
        this.errorMsg = data['message'];
        this.router.navigate(['/login'])
      } 
    });
  }
}

