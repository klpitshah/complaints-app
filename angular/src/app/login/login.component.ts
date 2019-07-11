// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.styl']
// })
// export class LoginComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }
import { Component, OnInit } from '@angular/core';
import { AuthService} from '../services/auth.service';
import { Router} from '@angular/router';
import {  FlashMessagesService } from 'angular2-flash-messages';
import { FormsModule } from '@angular/forms';
import { FormGroup , FormControl, Validators} from '@angular/forms';
import { UsernameValidators } from '../register/username.validators';
import { PhoneNumberValidator } from '../register/phoneNo.validators';
import { EmailValidators } from '../register/email.validators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {

  constructor(private authService :AuthService,
              private router:Router,
              // private validateService :ValidateService ,
              private flashMessagesService : FlashMessagesService,
              private usernameValidators : UsernameValidators,
            ) { }

  private counter ;
  form = new FormGroup({
    username: new FormControl('', [
      Validators.required   
      ]
       ),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
    });
  ngOnInit() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  onSubmit() {
    let obj = this.form.value;
    const user = {
        password : obj.password,
        username : obj.username
    }
      console.log(user);
      this.authService.authenticateUser(user).subscribe(data=>{
          if(data.success){
            this.authService.storeUserData(data.token , data.user);
            this.flashMessagesService.show('now you are logged in' ,{cssClass: 'alert-success' ,timeout :5000});
            this.router.navigate(['Profile',user.username]);
          }
          else {
            this.flashMessagesService.show(data.msg ,{cssClass: 'alert-danger' ,timeout :5000});
            this.router.navigate(['Login']);
          }
      });
  }
}
