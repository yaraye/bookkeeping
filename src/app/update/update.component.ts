import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {MembersService} from '../members.service';
import {HttpClient} from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  memberData:any;
  reason_array:any;
  months_array:any;
  membersData:any;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  
  
    constructor(private route: ActivatedRoute,  private router:Router, private memberService: MembersService, private httpClient: HttpClient, 
      private authService: AuthenticationService) { 
    //  to display the options we need the reason_array
      this.reason_array = ['Building', 'Collection baskets', 'Donation', 'Membership', 'Tithe','other']
  
     this.memberData= {
          id:'',
          first_name: '',
          last_name:'',
          reason:'', 
          payment_months:'',
          amount : '',
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
  

    // new Date(Date.parse(mon +" 1, 2012")).getMonth()+1


    showPaymentMonths(dataOfMonths) {
      let result = [];
      console.log(dataOfMonths);
      if (dataOfMonths.length != 0) {
        for (let month of dataOfMonths) {
          result.push(month.itemName);
        }
        // result = dataOfMonths.map(a => a.itemName);
      }
      return result.join(', ');
    }
  
    ngOnInit(){
      this.route.params.subscribe( params =>
        this.memberService.fetchMember(params['memberid']).subscribe((data)=>{
          data['payment_months']
          let months= data['payment_months'].split(', ')
          let monthData= []
          for (let month of months) {
            monthData.push({id:new Date(Date.parse(month +" 1, 2012")).getMonth()+1, itemName:month})
          }
          data['payment_months']= monthData
          this.memberData = data;
          
        })
    )
      // this.memberService.fetchMember--gets the is clicked        
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
    let postData  = Object.assign({}, this.memberData);
    postData.payment_months =  this.showPaymentMonths(postData.payment_months);
    postData['received_by']= this.authService.getLoggedInUserData()['name']
    this.httpClient.post('http://127.0.0.1:5000/update/'+ this.memberData.id, postData).subscribe((data) => {
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