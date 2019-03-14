import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import{LocalStorageService} from 'angular-2-local-storage';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  errorMsg:'string'

  constructor(private router: Router, private localS: LocalStorageService, private auth: AuthenticationService) { }

  ngOnInit() {
  }
  handleRegister(){
    this.router.navigate(['./'])
//     this.auth.login(this.user['username'], this.user['password']).subscribe((data)=> {
//       if(data['status']){
//         this.errorMsg = '';
// // to store the token 
//         this.localS.add('USER_LOGGED_IN_KEY', 1)
//         this.router.navigate(['/members'])
//       } else{
//         this.errorMsg = data['message'];
//         this.router.navigate(['/login'])
//       } 
//     });
  // }
}
}
