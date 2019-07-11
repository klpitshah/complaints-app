import {Injectable} from '@angular/core';
import {Router,CanActivate} from '@angular/router';
import {AuthService  } from '../services/auth.service';

@Injectable()
export class Auth2Guard implements CanActivate{
    constructor(    private authSerice : AuthService, 
                    private router : Router
                ){}

 canActivate(){

    if(this.authSerice.loggedIn()){
        // console.log("you are logged in ....");
        this.router.navigate(['/']);
         return false;
         }
    else { 
        // console.log("navigated to login ..not logged in ...");
            return true;}
}


 
}