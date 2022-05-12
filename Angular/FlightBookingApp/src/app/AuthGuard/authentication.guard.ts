import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuardServiceService } from '../Services/auth-guard-service.service';
import { UserServiceService } from '../Services/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  /**
   *
   */
  constructor(private authGuardService:AuthGuardServiceService,private router:Router,private userService:UserServiceService) {
    
    

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userRole=this.userService.getRole();
    if(!this.authGuardService.isUserLoggedIn())
    {
      this.router.navigateByUrl("/login");
    }
    debugger;
    if (route.data['role'] != undefined && route.data['role'] != 'admin') {
      debugger;
      this.router.navigate(['/login']);
      return false;
    }
 

    return this.authGuardService.isUserLoggedIn();
  }


  
}

