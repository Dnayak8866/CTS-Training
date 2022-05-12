import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BookTicket } from '../Interfaces/bookticket';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {
  apiGateWayEndpoint =environment.apiGateWayURL;// "http://localhost:9000/";
  accessToken = this.userService.getToken() ?? "no_token";

  constructor(private httpClient: HttpClient, private userService: UserServiceService) {
  }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  authHeader = {

    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': "Bearer " + this.accessToken
    }),
  }

  bookTicket(data:any)
  {
    return this.httpClient.post<BookTicket>(this.apiGateWayEndpoint + "api/v1.0/flight/booking/bookticket",
      JSON.stringify(data), this.httpHeader)
      .pipe( catchError(this.processError));
  }

  getBookingsByUserID(userId: number): Observable<any> {
    return this.httpClient.get<any>(this.apiGateWayEndpoint + "Aggregator/GetBookingByUser/" + userId, this.httpHeader)
      .pipe(retry(1), catchError(this.processError));

  }
  getBookingsByPnr(pnr: any): Observable<any> {
    return this.httpClient.get<any>(this.apiGateWayEndpoint + "api/v1.0/flight/ticket/" + pnr, this.httpHeader)
      .pipe(retry(1), catchError(this.processError));

  }

  
  cancelTicket(pnr: any) {
    return this.httpClient.delete(this.apiGateWayEndpoint + "/api/v1.0/flight/booking/cancel/" + pnr, this.httpHeader)
      .pipe(retry(1), catchError(this.processError));
  }
  processError(err: any) {

    let message = '';
    if (err.error instanceof ErrorEvent) {
      message = err.error.message;
    } else {
      message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(message);
    alert(message);
    return throwError(() => {
      message;
    });
  }
}
