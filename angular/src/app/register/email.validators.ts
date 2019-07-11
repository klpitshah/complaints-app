// import { AngularFireDatabase } from 'angularfire2/database';
import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Injectable } from '@angular/core';
import { AuthService} from '../services/auth.service';
import { AuthConfig } from 'angular2-jwt';
@Injectable()
export class EmailValidators {
    
    constructor(
        // private db: AngularFireDatabase
        private authService : AuthService
    ) {
    }
 
    public validEmailEnter(control: AbstractControl): ValidationErrors | null {
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!reg.test(control.value as string)) return {validEmailEnter: true}
        else  null;
    }

    // public notAUniqueEmail = (control: AbstractControl): Promise<ValidationErrors | null> => {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             let count = 0;
    //             this.authService.getAllUsers().subscribe(res=>{
    //                 console.log(control.value);
    //                 for(let i=0;i< res.json().length ; i++){
    //                     if(res.json()[i].email == (control.value as string)){
    //                         resolve({ notAUniqueEmail: true });
    //                         console.log("same " + res.json()[i].email);
    //                         count++;
    //                     }
    //                 }
    //                 if(count == 0)resolve(null);
    //             });
    //             // resolve({ notAUniqueEmail: true  });
    //         }, 1000);
    //     });
    // }

}