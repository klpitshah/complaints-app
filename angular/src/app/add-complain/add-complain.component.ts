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
  selector: 'app-add-complain',
  templateUrl: './add-complain.component.html',
  styleUrls: ['./add-complain.component.styl']
})
export class AddComplainComponent implements OnInit {

  constructor(private authService :AuthService,
              private router:Router,
              // private validateService :ValidateService ,
              private flashMessagesService : FlashMessagesService,
              private usernameValidators : UsernameValidators,
            ) { }

  private counter ;
  categories = ["Health" ,"Water", "Road", "Infrastructure", "Rural Development"];
  form = new FormGroup({
    complainName: new FormControl('', [
      Validators.required   
      ]
    ),

    type: new FormControl('', [
      Validators.required
    ]),

    area: new FormControl('', [
      Validators.required   
      ]
    ),

    city: new FormControl('', [
      Validators.required   
      ]
    )
    });

  user : any;

  ngOnInit() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    this.authService.getProfile().subscribe( profile =>{
      this.user = profile.user;
      // console.log(this.user);
     },err=>{
       console.log(err);
       return false;
    });
  }

  onSubmit() {
    let obj = this.form.value;
    const user = {
        complainerName : this.user.name,
        complainerId : this.user._id,
        complainName : obj.complainName,
        type : obj.type,
        city : obj.city,
        area : obj.area
    }
    console.log(user);
    this.authService.addComplain(user).subscribe(data=>{
        if(data.success){
          this.flashMessagesService.show(data.msg ,{cssClass: 'alert-success' ,timeout :5000});
          this.router.navigate(['/']);
        }
        else {
          this.flashMessagesService.show(data.msg ,{cssClass: 'alert-danger' ,timeout :5000});
          this.router.navigate(['Login']);
        }
    });
  }
}

