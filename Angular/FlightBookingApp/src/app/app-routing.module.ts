import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { AirlineAddComponent } from './airline/airline-add/airline-add.component';
import { AirlineListComponent } from './airline/airline-list/airline-list.component';
import { DiscountAddComponent } from './airline/discount-add/discount-add.component';
import { DiscountListComponent } from './airline/discount-list/discount-list.component';

import { ScheduleAddComponent } from './airline/schedule-add/schedule-add.component';
import { SchedulesComponent } from './airline/schedules-list/schedules.component';
import { AuthenticationGuard } from './AuthGuard/authentication.guard';
import { AddPassengerComponent } from './booking/add-passenger/add-passenger.component';
import { BookingHistoryComponent } from './booking/booking-history/booking-history.component';
import { BookingManageComponent } from './booking/booking-manage/booking-manage.component';
import { BookingTicketComponent } from './booking/booking-ticket/booking-ticket.component';
import { LoginComponent } from './login/login.component';
import { UserMenuComponent } from './user-menu/user-menu.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: AdminMenuComponent, canActivate: [AuthenticationGuard] },
  { path: '', component: LoginComponent },
  {
    path: 'airlines', component: AirlineListComponent, canActivate: [AuthenticationGuard],
    data: {
      role: 'admin'
    }
  },
  { path: 'add-airline', component: AirlineAddComponent, canActivate: [AuthenticationGuard],
  data: {
    role: 'admin'
  } },
  { path: 'edit-airline/:id', component: AirlineAddComponent, canActivate: [AuthenticationGuard] ,
  data: {
    role: 'admin'
  }},
  { path: 'edit-schedule/:id', component: ScheduleAddComponent, canActivate: [AuthenticationGuard],data: {
    role: 'admin'
  }},
  { path: 'schedules', component: SchedulesComponent, canActivate: [AuthenticationGuard],data: {
    role: 'admin'
  } },
  { path: 'add-schedule', component: ScheduleAddComponent, canActivate: [AuthenticationGuard],data: {
    role: 'admin'
  } },
  { path: 'user-menu', component: UserMenuComponent, canActivate: [AuthenticationGuard], },
  { path: 'manage-booking', component: BookingManageComponent ,canActivate: [AuthenticationGuard]},
  { path: 'booking-history', component: BookingHistoryComponent,canActivate: [AuthenticationGuard] },
  { path: 'add-passenger', component: AddPassengerComponent,canActivate: [AuthenticationGuard] },
  { path: 'booking-ticket', component: BookingTicketComponent ,canActivate: [AuthenticationGuard]},
  { path: 'discount-add', component: DiscountAddComponent,canActivate: [AuthenticationGuard], data: {
    role: 'admin'
  }},
  { path: 'discount-list', component: DiscountListComponent,canActivate: [AuthenticationGuard],data: {
    role: 'admin'
  } },
  { path: 'edit-discount/:id', component: DiscountAddComponent, canActivate: [AuthenticationGuard],data: {
    role: 'admin'
  }},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
