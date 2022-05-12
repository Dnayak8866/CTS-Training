import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Discount } from 'src/app/Interfaces/Discount';
import { AirlineServiceService } from 'src/app/Services/airline-service.service';

@Component({
  selector: 'app-discount-add',
  templateUrl: './discount-add.component.html',
  styleUrls: ['./discount-add.component.css']
})
export class DiscountAddComponent implements OnInit {

  discountId=this.activeRoute.snapshot.params["id"];

  discount:Discount={
   
  };

  constructor(private airlineService:AirlineServiceService,private router:Router,private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.getDisocuntById();
  }

  getDisocuntById(){
    if(this.discountId!=undefined)
    {
      this.airlineService.getDiscccountByID(this.discountId).subscribe((res:Discount)=>{
        this.discount=res;
      
      })
    }
  }

  saveDiscount(){
   this.airlineService.addNewDiscount(this.discount).subscribe((res:any)=>{
     //alert(res);
     this.router.navigateByUrl('/discount-list');
   });
  }

}
