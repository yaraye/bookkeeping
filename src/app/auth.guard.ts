import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import{LocalStorageService} from 'angular-2-local-storage';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
// Inject Router so we can hand off the user to the Login Page 
  constructor (private route: Router, private localS: LocalStorageService){
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (state.url === '/login') {
      } else {
        if (this.localS.get('USER_LOGGED_IN_KEY')) {
          return true;
        } else {
          this.LoginPage();
        }
      }
    }
    
LoginPage() {
  // alert('Please login first');
  this.route.navigate(['/login']);
}
}
