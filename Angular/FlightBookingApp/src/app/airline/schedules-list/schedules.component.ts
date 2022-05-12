import { Component, OnInit } from '@angular/core';
import { AirlineServiceService } from 'src/app/Services/airline-service.service';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {
  flightInventory:any=[];
  constructor(private airlineService:AirlineServiceService) { }

  ngOnInit(): void {
    this.getFlightScedules();
  }
  getFlightScedules(){
    this.airlineService.getFlightInventory().subscribe((res:any)=>{
      this.flightInventory=res;
    })
  }

}
