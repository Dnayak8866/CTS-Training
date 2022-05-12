import { Component, OnInit } from '@angular/core';
import {Input} from '@angular/core'

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

  constructor() { }

@Input() activeTab:string='';
 
  ngOnInit(): void {
  }

  logoutClicked(){
    localStorage.removeItem("Sessionuser");
    localStorage.removeItem('access_token');
  }

}
