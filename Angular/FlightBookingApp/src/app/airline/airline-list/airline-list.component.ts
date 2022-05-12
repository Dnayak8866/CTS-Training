import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Airline } from 'src/app/Interfaces/Airline';
import { AirlineServiceService } from 'src/app/Services/airline-service.service';

@Component({
  selector: 'app-airline-list',
  templateUrl: './airline-list.component.html',
  styleUrls: ['./airline-list.component.css']
})


export class AirlineListComponent implements OnInit {
  constructor(private airlineService: AirlineServiceService,private router:Router) { }
  airlines: any = [];
  ngOnInit(): void {
    this.getAllAirlines();
  }

  getAllAirlines() {
    this.airlineService.getAirlines().subscribe((res: any) => {
      this.airlines = res;

    });
  }

  blockAirline(id: number, isBlock: boolean) {
    debugger;
    this.airlineService.blockAirline(id, isBlock).subscribe(
      (res: any) => {
      
        this.getAllAirlines();
      },
      (err: any) => {

      });
  }
}
