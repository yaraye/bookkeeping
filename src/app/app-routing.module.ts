import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {MembersComponent} from './members/members.component';
import {MembersListComponent} from './members-list/members-list.component';
import {AuthGuard} from './auth.guard';
import {RegistrationComponent} from './registration/registration.component';
import {MembershipComponent} from './membership/membership.component';
import { DonationComponent } from './donation/donation.component';
import { BuildingComponent } from './building/building.component';
import { UpdateComponent } from './update/update.component';


const routes: Routes = [
  // this will give a dash bored the empty route
  {path: '', component: MembersComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'members', component: MembersComponent, canActivate: [AuthGuard]},
  {path: 'membersList', component: MembersListComponent, canActivate: [AuthGuard]},
  {path: 'membership', component: MembershipComponent, canActivate: [AuthGuard]},
  {path: 'donation', component: DonationComponent, canActivate: [AuthGuard]},
  {path: 'building', component: BuildingComponent, canActivate:[AuthGuard]},
  {path: 'update/:memberid/:abc', component:UpdateComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
