import { Component, OnInit } from '@angular/core';
import {MembersService} from '../members.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent implements OnInit {
  membersData: any;
  firstName: string;



  constructor(private memberService: MembersService, private router:Router ) {
  
  }

  listMembers() {
    this.memberService.fetchBuilding().subscribe((data) => {
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

