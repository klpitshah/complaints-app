// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.styl']
// })
// export class NavbarComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router} from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.styl','./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService :AuthService,
  private router:Router
  ) { }   
  private hotelUser : any;
  private usernameOfUser;
  private navbarOpen = false;
  ngOnInit() {
  }

  onLogout = () => {
    //console.log('Logout clicked');
    //this.flashMessages.show('Logged out', { cssClass: "alert-danger", timeout: 5000 });
    this.authService.logout();
    this.router.navigate(['/']);
    //this.webService.checkingAtLogout();
  }
  toggleNav(){
    console.log("toggling navbar");
    this.navbarOpen = !this.navbarOpen;
  }
}

