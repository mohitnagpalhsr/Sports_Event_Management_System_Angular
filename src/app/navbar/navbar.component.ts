import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  role:string;

  constructor(private jwtHelper: JwtHelperService, private router: Router, private service:AppService) { 
    //this.role=this.service.role;
    console.log("hi i am constructor");
  }

  ngOnInit(): void {
    console.log("hi i am ngoninit");
  }

  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwt");
    this.role=localStorage.getItem("role");


    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }

    return false;
  }

  logOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("refreshToken");
    this.router.navigate(["/"]);
  }
}
