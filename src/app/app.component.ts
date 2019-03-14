
import { Component, Input } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';
// import * as jwt_decode from 'jwt-decode';


@Component({
  // is the name of the component
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userObj:any;
  constructor(private authService: AuthenticationService, 
    private localS: LocalStorageService, private router: Router){

// this.userObj = false --will give us no nav bar at the start
    this.userObj = false 
//if user is logged in to stay in the page not to be redirected
    if(this.localS.get('LOGGED_USER_DATA')){
      this.authService.authenticateState.next(true);
    }
// everytime the virable change let me know and this part of the code is 
// run in observable but in promise it only runs once
    this.authService.authenticateState.subscribe((data)=>{
      if(data===true){
        this.userObj = localS.get('LOGGED_USER_DATA')
        console.log(this.userObj)
      }else{
        this.userObj = ''
        this.router.navigate(['/login'])
      }
  });
  }

  logOut(){
  this.localS.remove('USER_LOGGED_IN_KEY');
  this.authService.authenticateState.next(false);

 }
}

