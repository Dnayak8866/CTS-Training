import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationServiceService } from '../notification-service.service';
import { UserServiceService } from '../Services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = "";
  password = "";
  constructor(private router: Router, private userService: UserServiceService, private notificService: NotificationServiceService) {

  }

  ngOnInit(): void {
    this.checkAlreadyLoggenIn();
  }

  login() {
    let result: any;
    this.userService.login(this.username, this.password).subscribe(
      (next: any) => {
        console.log("Success", next);
        if (next.user != undefined) {
          debugger;
          this.navigateRouteByRole(next.user);
          localStorage.setItem("Sessionuser", JSON.stringify(next.user));
          localStorage.setItem("access_token", next.token.access_token);
          this.notificService.showSuccess("Login Success", "Login");
        }

      },
      (err: any) => {
        console.log('Error: ', err.status);
        this.notificService.showError("Invalid user....", "Login Failed");
      },
      () => { console.log("Completed..."); }
    );

  }

  checkAlreadyLoggenIn() {
    let user = JSON.parse(localStorage.getItem('Sessionuser') || '{}');
    this.navigateRouteByRole(user);
  }

  navigateRouteByRole(user: any) {

    if (user.role == "admin")
      this.router.navigateByUrl("/airlines");
    else if (user.role == "client")
      this.router.navigateByUrl("/booking-ticket");
  }

}


