import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookTicket } from 'src/app/Interfaces/bookticket';
import { Passenger } from 'src/app/Interfaces/passenger';
import { NotificationServiceService } from 'src/app/notification-service.service';
import { BookingServiceService } from 'src/app/Services/booking-service.service';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-booking-manage',
  templateUrl: './booking-manage.component.html',
  styleUrls: ['./booking-manage.component.css']
})
export class BookingManageComponent implements OnInit {
/**
 *
 */
myBookings:any[]=[];
user=this.userService.getCurrentUser();
closeModal: string="";
ticket:BookTicket=new BookTicket();
passengers:Passenger[]=[];
  constructor(private modalService: NgbModal,private router:Router,private bookingServie:BookingServiceService,private userService:UserServiceService,private notificationService:NotificationServiceService ) {

   }
 
  ngOnInit(): void {
    this.getBookings();
  }

getBookings(){
  this.bookingServie.getBookingsByUserID(this.user.id).subscribe((res:any)=>{
  debugger;
    this.myBookings=res;
  });
}


cancelTicket(pnr:any){
  this.bookingServie.cancelTicket(pnr).subscribe((res:any)=>{
    this.getBookings();
    this.notificationService.showInfo("","Ticket cancelled...");
    
  });
  

}

triggerModal(content:any,pnr:any) {

  debugger;
 this.getTicketDetailByPnr(pnr);

  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
    this.closeModal = `Closed with: ${res}`;
  }, (res) => {
    this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
  });


}

getTicketDetailByPnr(pnr:any)
{
    this.bookingServie.getBookingsByPnr(pnr).subscribe((res:any)=>{
    
    this.ticket=res;
    this.passengers=res.passengers;  
    })
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}
  

}
