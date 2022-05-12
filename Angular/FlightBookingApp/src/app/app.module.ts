import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { AirlineListComponent } from './airline/airline-list/airline-list.component';
import { SchedulesComponent } from './airline/schedules-list/schedules.component';
import {HttpClientModule } from  '@angular/common/http';
import { AirlineAddComponent } from './airline/airline-add/airline-add.component';
import { AirlineServiceService } from './Services/airline-service.service';
import { ScheduleAddComponent } from './airline/schedule-add/schedule-add.component';
import { UserServiceService } from './Services/user-service.service';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { ToastrModule } from 'ngx-toastr';
import { NotificationServiceService } from './notification-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuardServiceService } from './Services/auth-guard-service.service';
import { BookingHistoryComponent } from './booking/booking-history/booking-history.component';
import { BookingManageComponent } from './booking/booking-manage/booking-manage.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Placement as PopperPlacement, Options } from '@popperjs/core';
import { AddPassengerComponent } from './booking/add-passenger/add-passenger.component';
import { BookingTicketComponent } from './booking/booking-ticket/booking-ticket.component';
import { DiscountAddComponent } from './airline/discount-add/discount-add.component';
import { DiscountListComponent } from './airline/discount-list/discount-list.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminMenuComponent,
    AirlineListComponent,
    SchedulesComponent,
    AirlineAddComponent,
    ScheduleAddComponent,
    UserMenuComponent,
    BookingHistoryComponent,
    BookingManageComponent,
    AddPassengerComponent,
    BookingTicketComponent,
    DiscountAddComponent,
    DiscountListComponent,

      

  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgbModule,
    ReactiveFormsModule 
  ],
  providers: [AirlineServiceService,UserServiceService,NotificationServiceService,AuthGuardServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
