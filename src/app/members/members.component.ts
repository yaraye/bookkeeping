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
year_array:any;
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
    this.year_array =[2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030,2031, 2032, 2034]
    this.memberData= 
    {
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
        {"id":12,"itemName":"December"},
        {"id":13,"itemName":2015},
        {"id":14,"itemName":2016},
        {"id":15,"itemName":2017},
        {"id":16,"itemName":2018},
        {"id":17,"itemName":2019},
        {"id":18,"itemName":2020},
        {"id":19,"itemName":2021},
        {"id":20,"itemName":2022},
        {"id":21,"itemName":2023},
        {"id":22,"itemName":2024},
        {"id":23,"itemName":2025},
        {"id":24,"itemName":2026},
        {"id":25,"itemName":2027},
        {"id":26,"itemName":2028},
        {"id":27,"itemName":2029},
        {"id":28,"itemName":2030},

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

}