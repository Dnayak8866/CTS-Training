import { Component, OnInit } from '@angular/core';
import { Passenger } from 'src/app/Interfaces/passenger';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationServiceService } from 'src/app/notification-service.service';
import { Navigation, Router } from '@angular/router';
import { BookTicket } from 'src/app/Interfaces/bookticket';
import { BookingServiceService } from 'src/app/Services/booking-service.service';
import { UserServiceService } from 'src/app/Services/user-service.service';
import { Discount } from 'src/app/Interfaces/Discount';
import { AirlineServiceService } from 'src/app/Services/airline-service.service';

@Component({
  selector: 'app-add-passenger',
  templateUrl: './add-passenger.component.html',
  styleUrls: ['./add-passenger.component.css']
})
export class AddPassengerComponent implements OnInit {
  passenger = new Passenger();
  passengers: Passenger[] = [];
  discounts: Discount[] = [];
  discountValue: number=0;
  totalCost: number=0;
  oneWayCost:number=0;
  twoWayCost:number=0;


  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required, Validators.min(1)]),
    gender: new FormControl('', [Validators.required]),

  });
  data: any = {};
  oneWayTicket: BookTicket = new BookTicket();
  twowayTicket: BookTicket = new BookTicket();
  bookings: BookTicket[] = [];
  isOneWay: boolean = true;
  routeState: any;
  journeyType: string = "oneway";
  user: any;


  constructor(private notificationServic: NotificationServiceService, private airlineService: AirlineServiceService, private userService: UserServiceService, private router: Router, private bookingService: BookingServiceService) {
    var nav = this.router.getCurrentNavigation() as Navigation;
    debugger;
    if (nav != null && nav.extras.state) {
      this.routeState = nav.extras.state;
      if (this.routeState) {
        debugger;
        this.oneWayTicket = this.routeState.oneWayTicket ? JSON.parse(this.routeState.oneWayTicket) : null;
        this.twowayTicket = this.routeState.twoWayTicket ? JSON.parse(this.routeState.twoWayTicket) : null;
        this.isOneWay = this.routeState.isOneWay;

        sessionStorage.setItem("oneWayTicket", JSON.stringify(this.oneWayTicket));
        sessionStorage.setItem("twoWayTicket", JSON.stringify(this.twowayTicket));
        sessionStorage.setItem("isOneWay", JSON.stringify(this.isOneWay));


      }
    }

    this.oneWayTicket = JSON.parse(sessionStorage.getItem("oneWayTicket") || '');
    this.twowayTicket = JSON.parse(sessionStorage.getItem("twoWayTicket") || '');
    this.isOneWay = JSON.parse(sessionStorage.getItem("isOneWay") || '');

    debugger;
  }

  ngOnInit(): void {

    this.user = this.userService.getCurrentUser();
    this.getAllDiscounts();

    this.oneWayCost=(this.oneWayTicket)? this.oneWayTicket.totalCost:0;
    this.twoWayCost=(this.twowayTicket)?this.twowayTicket.totalCost:0;
    this.totalCost=(this.oneWayCost)?this.oneWayCost:0+ ((this.twoWayCost)?this.twoWayCost:0);

  }

  getAllDiscounts() {
    this.airlineService.getDiscounts().subscribe((res: any) => {
      this.discounts = res;
    })
  }

  applyDiscount(){
    debugger;
    
    this.setDiscount();
    
  }

  setDiscount(){
    let passengerCnt=this.passengers.length;
    this.oneWayCost=((this.oneWayTicket)?this.oneWayTicket.totalCost:0)-this.discountValue;
    this.twoWayCost=((this.twowayTicket)?this.twowayTicket.totalCost:0)-this.discountValue;
    this.totalCost=(passengerCnt>0)?((this.oneWayCost+this.twoWayCost)*passengerCnt):(this.oneWayCost+this.twoWayCost);
  }

  addPassenger() {
    debugger;
    console.log(this.form.valid);

    if (this.form.valid) {
      this.passengers.push(this.passenger);
      this.passenger = new Passenger();
      this.form.reset();
      this.setDiscount();
    }

  }

  clearPassengerObjectValue() {
    this.passenger.name = '';
    this.passenger.age = 0;
    this.passenger.gender = '';
  }

  confirmBooking() {
    if (this.passengers.length == 0) {
      this.notificationServic.showInfo("Please add atleast one passenger", "");
      return;
    }
    debugger;
    //assign passengers
    this.oneWayTicket.passengers = this.passengers;
    this.oneWayTicket.noofSeats = this.passengers.length;
    this.oneWayTicket.isCancelled = false;
    this.oneWayTicket.journeyType = "oneway";
    this.oneWayTicket.userID = this.user.id;
    this.oneWayTicket.totalCost=this.oneWayCost;

    this.bookings.push(this.oneWayTicket);

    if (!this.isOneWay) {
      this.twowayTicket.passengers = this.passengers;
      this.twowayTicket.noofSeats = this.passengers.length;
      this.twowayTicket.isCancelled = false;
      this.twowayTicket.journeyType = "roundtrip";
      this.twowayTicket.userID = this.user.id;
      this.twowayTicket.totalCost=this.twoWayCost;
      this.bookings.push(this.twowayTicket);
    }
    //clear session values for tickets
    this.bookingService.bookTicket(this.bookings).subscribe((res: any) => {
      sessionStorage.removeItem("oneWayTicket");
      sessionStorage.removeItem("twoWayTicket");
    });
    alert("Ticket Booked...");
    this.router.navigateByUrl("/manage-booking");
  }

  removePassenger(id: number) {
    this.passengers.splice(id, 1);
    this.setDiscount();
  }


}
