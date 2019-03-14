import { Component, OnInit} from '@angular/core';
import {MembersService} from '../members.service';
import {Router} from '@angular/router';
// import { Subscription } from 'rxjs';


@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})

export class MembersListComponent implements OnInit {
  membersData: any;
  firstName: string;
  id_data:[];

  constructor(private memberService: MembersService, private router:Router) {
    this.id_data = [];
  }

  listMembers() {
    this.memberService.fetchMembers().subscribe((data) => {
      this.membersData = data;
      console.log(data);
    }, (err) => {
      console.log('error')
    });
    
  }

  ngOnInit() {
  
    this.listMembers();
  }

edit(id){
  this.router.navigate(['/update', id, 1])

}

deleteMembers(id){
  this.membersData.id=id
  if (confirm("Are you sure you want to delete " + id+ "?")){
     this.memberService. delete(id).subscribe((data) => {
      console.log(data);
      this.listMembers();
     });
     
  }

 }

 

}

