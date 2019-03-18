import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MembersService} from '../members.service';
import {HttpClient} from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
memberData:any;
reason_array:any;
months_array:any;
membersData:any;
payment_method:any;
dropdownList = [];
selectedItems = [];
dropdownSettings = {};

months;
years = [];


  constructor(private router:Router, private memberService: MembersService, private httpClient: HttpClient, 
    private authService: AuthenticationService) { 
  //  to display the options we need the reason_array
    this.reason_array = ['Building', 'Collection baskets', 'Donation', 'Membership', 'Tithe','other']
  
   this.memberData= {
        first_name: '',
        last_name:'',
        reason:'', 
        other:'',
        payment_months:'',
        amount : '',
        payment_method: '',
        invoice: '',
        // todaydate = ''
        received_by :this.authService.getLoggedInUserData()['name']
    }
    
    
     this.dropdownList = 
     [
                            {"id":1,"itemName":"January"},
                            {"id":2,"itemName":"February"},
                            {"id":3,"itemName":"March"},
                            {"id":4,"itemName":"April"},
                            {"id":5,"itemName":"May"},
                            {"id":6,"itemName":"June"},
                            {"id":7,"itemName":"July"},
                            {"id":8,"itemName":"August"},
                            {"id":9,"itemName":"September"},
                            {"id":10,"itemName":"October"},
                            {"id":11,"itemName":"November"},
                            {"id":12,"itemName":"December"}
                          ];
    this.dropdownSettings = { 
      singleSelection: false, 
      text:"Select Members",
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      enableSearchFilter: true,
      classes:"myclass custom-class"
    };            

  
  }
  listMembers() {
    this.memberService.fetchMembers().subscribe((data) => {
      this.memberData = data;
      console.log(data);
    }, (err) => {
      console.log('error')
    });
  }

  showPaymentMonths(dataOfMonths) {
    let result = [];
    if (dataOfMonths.length != 0) {
      for (let month of dataOfMonths) {
        result.push(month.itemName);
      }

      // result = dataOfMonths.map(a => a.itemName);
    }
    return result.join(', ');
  }

  ngOnInit(){
          
}
onItemSelect(item:any){
    console.log(item);
    console.log(this.selectedItems);
}
OnItemDeSelect(item:any){
    console.log(item);
    console.log(this.selectedItems);
}
onSelectAll(items: any){
    console.log(items);
}
onDeSelectAll(items: any){
    console.log(items);
}


handleSubmit() {
  console.log(this.memberData);
    // this.router.navigate(['/membersList']);
  // let postData = this.memberData;
  let postData  = Object.assign({}, this.memberData);
  // let postData = this.memberData.map(x => Object.assign({}, x));
  // to have the payment month not as a array
  postData.payment_months =  this.showPaymentMonths(postData.payment_months);
  this.httpClient.post('http://127.0.0.1:5000/members', postData).subscribe((data) => {
    if (data['status']) {
      this.router.navigate(['/membersList']);
    } else {
      alert(data['message'])
    }
  }, (err) => {
    console.log(err)
    alert('Error occurred');
  });
}


getDates() {
  var date = new Date();
  var currentYear = date.getFullYear();

  //set values for year dropdown
  for (var i = 0; i <= 100; i++) {
    this.years.push(currentYear + i);
  }

  //set values for month dropdown
  this.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
}





// // onBlurMethod(){
// //     alert(this.memberData.first_name);
// //     alert(this.memberData.last_name);

//     // call the APi to fatch the data ans make sure first and name exist
//   }

}

// to bind the data
// [(ngModel)]= 'memberData.first_name' #first_name = 'ngModel' 
// export class MembersComponent implements OnInit {
//   memberData:any;
//   reason_array:any
  
//     constructor(private router:Router) { 
//       this.reason_array = ['Donation', 'Members Fee', 'Collection'],
//      this.memberData= {
//           first_name: '',
//           last_name:'',
//           reason:'', 
//           payment_months:'',
//           amount : 0
//           // this.date = ''
//           // received_by :''
//       }
    
//     }