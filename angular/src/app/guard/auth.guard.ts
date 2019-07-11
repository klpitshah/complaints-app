import {Injectable} from '@angular/core';
import {Router,CanActivate} from '@angular/router';
import {AuthService  } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(    private authSerice : AuthService, 
                    private router : Router
                ){}

 canActivate(){

    if(this.authSerice.loggedIn()){
        // console.log("you are logged in ....");
         return true;
         }
    else { 
        this.router.navigate(['/Login']);
        // console.log("navigated to login ..not logged in ...");
            return false;}
}


 
}