import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Router} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MembersComponent } from './members/members.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { MembersListComponent } from './members-list/members-list.component';
import{LocalStorageModule} from 'angular-2-local-storage';
import { JwtModule } from '@auth0/angular-jwt';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
  // LinkedinLoginProvider,
} from 'angular-6-social-login';
import {AuthGuard} from './auth.guard';
import { FilterPipe } from './search.pipe';
import { RegistrationComponent } from './registration/registration.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import {ModalModule} from "ng2-modal";
import { MembershipComponent } from './membership/membership.component';
import { DonationComponent } from './donation/donation.component';
import { BuildingComponent } from './building/building.component';
import { UpdateComponent } from './update/update.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';





export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('321676271797526')
        
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('1003236982581-nr5tbct0sg0aoc0kti90hnb0o9gn55lb.apps.googleusercontent.com')
        }
        // {
        //   id: LinkedinLoginProvider.PROVIDER_ID,
        //   provider: new LinkedinLoginProvider("1098828800522-m2ig6bieilc3tpqvmlcpdvrpvn86q4ks.apps.googleusercontent.com")
        // },
        ]);
  return config;
}

@NgModule({
  // goes all your components 
  declarations: [
    AppComponent,
    LoginComponent,
    MembersComponent,
    MembersListComponent,
    RegistrationComponent,
    MembershipComponent,
    DonationComponent,
    BuildingComponent,
    UpdateComponent,
    FilterPipe,
 
  ],
  // routes and modules go here
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    SocialLoginModule,
    JwtModule,
    AngularMultiSelectModule,
    ModalModule,
    NgxSmartModalModule.forRoot(),
    LocalStorageModule.withConfig({
      prefix:'angularProject',
      storageType:'localStorage'
    })
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },AuthGuard
  ],
  // list the components you want to load when the app starts. 
  bootstrap: [AppComponent]
})
export class AppModule { }

