// ng g service service_name
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import * as _ from 'underscore';
// import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  
 
  constructor(private httpClient:HttpClient) {}
  private columnSortedSource = new Subject<ColumnSortedEvent>();

  columnSorted$ = this.columnSortedSource.asObservable();

  columnSorted(event: ColumnSortedEvent) {
      this.columnSortedSource.next(event);
  }

  fetchMembers() {
    return this.httpClient.get('http://127.0.0.1:5000/members')
  };
  fetchMembership() {
    return this.httpClient.get('http://127.0.0.1:5000/member')
  };
  fetchDonation() {
    return this.httpClient.get('http://127.0.0.1:5000/donation')
  };
  fetchBuilding() {
    return this.httpClient.get('http://127.0.0.1:5000/building')
  };
  delete(id) {
    console.log('this' +'' + id);
    return this.httpClient.get('http://127.0.0.1:5000/delete/' + id)
  };
  fetchMember(id) {
    return this.httpClient.get('http://127.0.0.1:5000/getone/' + id)
  };
};
export interface ColumnSortedEvent {
    sortColumn: string;
    sortDirection: string;
}


