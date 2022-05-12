import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Airline } from '../Interfaces/Airline';
import { FlightInventory } from '../Interfaces/FlightInventory';
import { UserServiceService } from './user-service.service';
import { Discount } from '../Interfaces/Discount';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AirlineServiceService {
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
  getAirlines(): Observable<Airline[]> {
    debugger;
    
    return this.httpClient.get<Airline[]>(this.apiGateWayEndpoint + "airlines", this.authHeader)
      .pipe(retry(1), catchError(this.processError));
  }

  getFlightInventory(): Observable<FlightInventory[]> {
    return this.httpClient.get<FlightInventory[]>(this.apiGateWayEndpoint + "flight/GetFlightInventory", this.httpHeader)
      .pipe(retry(1), catchError(this.processError));
  }

  getAirlineByID(id: number): Observable<Airline> {
    return this.httpClient.get<Airline>(this.apiGateWayEndpoint + "airlines/GetAirlineById/" + id, this.httpHeader)
      .pipe(retry(1), catchError(this.processError));

  }
  getFlightInvemtoryById(id: number) {
    return this.httpClient.get<FlightInventory>(this.apiGateWayEndpoint + "airlines/GetFlightInventory/" + id, this.httpHeader)
      .pipe(retry(1), catchError(this.processError));
  }

  searchFlights(fromplace: string, toPlace: string, departDate: Date , returnDate?: Date | null): Observable<FlightInventory[]> {
    debugger;

    if (returnDate) {
      return this.httpClient.get<FlightInventory[]>(this.apiGateWayEndpoint + "api/v1.0/flight/search" + "?from=" + fromplace + "&to=" + toPlace + "&onboarddate=" + departDate + "&returnDate=" + returnDate, this.httpHeader)
        .pipe(retry(1), catchError(this.processError));
    }
    return this.httpClient.get<FlightInventory[]>(this.apiGateWayEndpoint + "api/v1.0/flight/search" + "?from=" + fromplace + "&to=" + toPlace + "&onboarddate=" +departDate , this.httpHeader)
      .pipe(retry(1), catchError(this.processError));

  }

  addNewAirline(data: any): Observable<any> {

    return this.httpClient.post<Airline>(this.apiGateWayEndpoint + "api/v1.0/flight/airline/register",
      JSON.stringify(data), this.httpHeader)
      .pipe(retry(1), catchError(this.processError));
  }

  blockAirline(airlineId: number, isBlock: boolean) {
    return this.httpClient.post(this.apiGateWayEndpoint + "airlines/BlockAirline/" + airlineId + "/" + isBlock, this.httpHeader)
      .pipe(retry(1), catchError(this.processError));
  }

  addNewFlightInventory(data: FlightInventory): Observable<any> {
    return this.httpClient.post<FlightInventory>(this.apiGateWayEndpoint + "api/v1.0/flight/airline/inventory/add", JSON.stringify(data), this.httpHeader)
      .pipe(retry(1), catchError(this.processError));
  }

  getDiscounts(): Observable<Discount[]> {
    debugger;
    return this.httpClient.get<Discount[]>(this.apiGateWayEndpoint + "Bookings/GetAllDiscounts", this.authHeader)
      .pipe(retry(1), catchError(this.processError));
  }

  addNewDiscount(data: any): Observable<any> {

    return this.httpClient.post<Discount>(this.apiGateWayEndpoint + "Bookings/AddDiscount",
      JSON.stringify(data), this.httpHeader)
      .pipe(retry(1), catchError(this.processError));
  }

  getDiscccountByID(id: number): Observable<Discount> {
    return this.httpClient.get<Discount>(this.apiGateWayEndpoint + "/Bookings/GetDiscountById/" + id, this.httpHeader)
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
