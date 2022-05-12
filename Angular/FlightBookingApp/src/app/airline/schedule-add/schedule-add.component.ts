import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Airline } from 'src/app/Interfaces/Airline';
import { FlightInventory } from 'src/app/Interfaces/FlightInventory';
import { AirlineServiceService } from 'src/app/Services/airline-service.service';

@Component({
  selector: 'app-schedule-add',
  templateUrl: './schedule-add.component.html',
  styleUrls: ['./schedule-add.component.css']
})
export class ScheduleAddComponent implements OnInit {

  invID=this.activeRoute.snapshot.params["id"];

  flightInvt: FlightInventory = {
    id: 0,
    flightNumber: 0,
    airlineID: 0,
    fromPlace: "",
    toPlace: "",
    startDateTime: null,
    endDateTime: null,
    scheduleDays: "",//need to change
    instrumentUsed: "",
    bussinesSteatsCount: 0,
    nonBussinesSeatCount: 0,
    ticketCost: 0,
    noofRows: 0,
    mealType: ""
  };

  
  form = new FormGroup({
    flightN: new FormControl('', [Validators.required]),
    fromP: new FormControl('', [Validators.required]),
    nbS: new FormControl('', [Validators.required]),
    instrument: new FormControl('', [Validators.required]),
    meal: new FormControl('', [Validators.required]),
    airlineName: new FormControl('', [Validators.required]),
    toPlace: new FormControl('', [Validators.required]),
    bSeat: new FormControl('', [Validators.required]),
    ticketCost: new FormControl('', [Validators.required]),
    srtDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    nrows: new FormControl('', [Validators.required]),


  });

  airlines: Airline[] = [];
  constructor(private airlineService: AirlineServiceService,private router:Router,private activeRoute:ActivatedRoute) {

  }

  ngOnInit(): void {
    this.getAirlines();

    if(this.invID!=undefined)
    {
      this.airlineService.getFlightInvemtoryById(this.invID).subscribe((res:FlightInventory)=>{
        this.flightInvt=res; 
      })
    }
    
  }
  getAirlines() {
    this.airlineService.getAirlines().subscribe((res: any) => {
      this.airlines = res;

    });
  }

  saveFlightSchedule(){

    //console.log("Flightdetails:",this.flightInvt);
    this.airlineService.addNewFlightInventory(this.flightInvt).subscribe((res:any)=>{
      
      this.router.navigateByUrl('/schedules');
    });
  }

}
