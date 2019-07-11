import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import { FormsModule, EmailValidator } from '@angular/forms';
import { FormGroup , FormControl, Validators} from '@angular/forms';
import { UsernameValidators } from './username.validators';
import { PhoneNumberValidator } from './phoneNo.validators';
import { EmailValidators } from './email.validators';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css','./register.component.styl']
})

export class RegisterComponent implements OnInit {

  acc_type_select = ["Worker","Government Employee","Admin of Department","Complainer"];
  dept_type = [];
  constructor(private validateService :ValidateService ,
              private flashMessagesService : FlashMessagesService,
              private authService : AuthService ,
              private router : Router ,
              private formsModle : FormsModule,
              private emailValidatorTs : EmailValidators,
              private usernameValidators : UsernameValidators
            ) { }
  form = new FormGroup({
    firstName: new FormControl('', Validators.required),

    username: new FormControl('', [
      Validators.required,   
      this.usernameValidators.cannotContainSpace
    ]
    ),

    email: new FormControl('', [
      Validators.required,
      Validators.email,
      this.emailValidatorTs.validEmailEnter,
    ]
    ),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    phoneNumber: new FormControl('',[
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      PhoneNumberValidator.isNotANum
    ]),
    acc_type : new FormControl('',Validators.required),
    category : new FormControl('',Validators.required),
    url : new FormControl('',[Validators.required])
    
    });          
  ngOnInit() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    this.logNameChange();
  }

  logNameChange(){
    const nameControl = this.form.get('acc_type');
    nameControl.valueChanges.forEach(
      (value: string) => {
        console.log(value);
        this.form.controls['category'].setValue('');
        this.findSUB(value);
    });
  }

  findSUB(item){
    console.log(this.form.value.acc_type + "   " +  item );
    if(item == "Worker" || item == "Government Employee")this.dept_type = ["Health","Water","Road","Infrastructur","Rural Development"];
    else if(item == "Complainer") this.dept_type = ["Prime","Premium"];
    else if(item == "Admin of Department") this.dept_type = ["Cateogry 1","Category 2"];
    else this.dept_type = ["Other"];
  }

  onSubmit() {
    let obj = this.form.value;
    const user = {
        name : obj.firstName,
        email : obj.email,
        password : obj.password,
        username : obj.username,
        url: obj.url,
        phoneNum: obj.phoneNumber,
        category : obj.category,
        acc_type : obj.acc_type,
    }
    if(!this.validateService.validateRegister(user)){
      this.flashMessagesService.show("enter all the fields ....",{cssClass:'alert-danger' , timeout:3000});
      return false;
    }
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessagesService.show("Enter Valid Email  !",{cssClass:'alert-danger' , timeout:3000});
      return false;
    } 
    // console.log(user);
      this.authService.registerUser(user).subscribe(data=>{
        if(data.success){
          this.flashMessagesService.show("Registred user ... ",{cssClass:'alert-success' , timeout:3000});
          // console.log(user.email + " sender email ");
          let msg = user.name + " , Congratulation for registration in our website THE COMPLAIN APP. Hope you like it and use it for your area complains. Thank you !" ;
          let object = {
            sender_email : "vaishvikbrahmbhatt.1998@gmail.com",
            sender_pw : "9408182450",
            receiver_email : user.email,
            message : msg
          };
          this.authService.sendEmails(object).subscribe((Response)=>{
            if(Response.success)    this.flashMessagesService.show('Email is successfully sent ' ,{cssClass: 'alert-success' ,timeout :4000});
            else {  this.flashMessagesService.show('ERROR in sending email ' ,{cssClass: 'alert-danger' ,timeout :4000}); }
          });
          this.router.navigate(['/Login']);
        }
        else{
           this.flashMessagesService.show("something went wrong ... ",{cssClass:'alert-danger' , timeout:3000});
        this.router.navigate(['/Register']);}
      })
    // console.log("done");
  }
  get username() {
    return this.form.get('username');
  }
  
  get firstname (){
    return this.form.get('firstname');
  }

}
