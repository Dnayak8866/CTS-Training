import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardServiceService {

  constructor() { }

  isUserLoggedIn(){
    return !!localStorage["Sessionuser"];
  }



}
