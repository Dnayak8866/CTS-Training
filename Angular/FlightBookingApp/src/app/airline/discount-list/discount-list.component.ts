import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Discount } from 'src/app/Interfaces/Discount';
import { AirlineServiceService } from 'src/app/Services/airline-service.service';

@Component({
  selector: 'app-discount-list',
  templateUrl: './discount-list.component.html',
  styleUrls: ['./discount-list.component.css']
})
export class DiscountListComponent implements OnInit {
  discounts:Discount[]=[];

  constructor(private airlineService: AirlineServiceService,private router:Router ) { }

  ngOnInit(): void {
    this.getAllDiscounts();
  }
  getAllDiscounts(){
    this.airlineService.getDiscounts().subscribe((res: any) => {
      this.discounts = res;
    });
  }

}
