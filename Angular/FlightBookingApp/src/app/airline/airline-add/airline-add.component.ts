import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { Airline } from 'src/app/Interfaces/Airline';
import { AirlineServiceService } from 'src/app/Services/airline-service.service';

@Component({
  selector: 'app-airline-add',
  templateUrl: './airline-add.component.html',
  styleUrls: ['./airline-add.component.css']
})
export class AirlineAddComponent implements OnInit {
  airlineId=this.activeRoute.snapshot.params["id"];

  airline:Airline={
    id:0,
    address:'',
    contactNumber:'',
    name:'',
    isBlocked:false
  };


  form = new FormGroup({
    airlinename: new FormControl('', [Validators.required]),
    contact: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),

  });
  constructor(private airlineService:AirlineServiceService,private router:Router,private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {
   this.getAirlineById();
  }

  getAirlineById(){
    if(this.airlineId!=undefined)
    {
      this.airlineService.getAirlineByID(this.airlineId).subscribe((res:Airline)=>{
        // this.airline.Name = res.name;
        // this.airline.Id = res.id;
        // this.airline.ContactNumber = res.contactNumber;
        // this.airline.Address = res.address;
        this.airline=res;
        console.log(res);
      })
    }
  }

  saveAirline(){
   this.airlineService.addNewAirline(this.airline).subscribe((res:any)=>{
     //alert(res);
     this.router.navigateByUrl('/airlines');
   });
  }

}
