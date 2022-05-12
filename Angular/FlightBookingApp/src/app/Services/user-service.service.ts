import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError, map } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  apiGateWayEndpoint =environment.apiGateWayURL;// "http://localhost:9000/";
  constructor(private httpClient: HttpClient) {

  }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),

  };

  login(username: string, password: string): Observable<any> {
   
    let params = new HttpParams();
    params.set('username', username);
    params.set('pasword', password);

    let header = 
   new HttpHeaders({   
      'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',         
    });



    // header.set('Content-Type', 'application/json');
    // header.set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get<any>(this.apiGateWayEndpoint + "Login?username="+username+"&pasword="+password, { headers: header })
      .pipe(retry(1));
    // return this.httpClient.get<any>(this.apiGateWayEndpoint + "Login", { headers: header,params:params })
    //   .pipe(retry(1));

  }

  getToken() {
    return localStorage.getItem('access_token');
  }


  getCurrentUser():any{
    // debugger;
    // let user:any= localStorage.getItem('Sessionuser');
    let user=localStorage.getItem('Sessionuser');

    return JSON.parse(user|| '{}');
  }

  getRole():String{
    let user=JSON.parse(localStorage.getItem('Sessionuser')||'{}');
    return user.role;
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
